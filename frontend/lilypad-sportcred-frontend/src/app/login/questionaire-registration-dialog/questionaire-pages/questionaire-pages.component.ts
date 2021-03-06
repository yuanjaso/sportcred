import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { Player, Sport, Team } from 'src/app/zone/zone.types';
import { AppState } from '../../../store/reducer';
import {
  selectPlayers,
  selectSports,
  selectTeams,
} from '../../../zone/store/selectors';
import {
  Answer,
  CustomAnswerOption,
  Question,
  QuestionType,
} from '../../login.types';

interface DataOrigin {
  selector: Observable<Player[] | Team[] | Sport[] | CustomAnswerOption[]>;
  filterFunc: (
    dataPoint: Player | Team | Sport | CustomAnswerOption,
    filter: string
  ) => boolean;
}

@Component({
  selector: 'app-questionaire-pages',
  templateUrl: './questionaire-pages.component.html',
  styleUrls: ['./questionaire-pages.component.scss'],
})
export class QuestionairePagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  @Input() question: Question = undefined;

  //custom filter is to further filter response type, for example if we
  // want all teams only in the eastern conference...
  // only applicable to questions with a select range of responses ('Lakers', 'Raptors'...)
  @Input() customFilter: () => boolean;
  @Input() outOf: String = '';
  @Output() answer = new EventEmitter<Answer>();

  form: FormGroup = new FormGroup({
    answer: new FormControl(undefined, [Validators.required]),
    search: new FormControl(undefined),
  });

  // create this local variable to access in html
  questionTypes = QuestionType;

  //---------------data---------------
  $answerSelection: Observable<
    Player[] | Team[] | Sport[] | CustomAnswerOption[]
  > = undefined;
  //dataOrigin is where we get the data for this specific question type
  dataOrigin: DataOrigin;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dataOrigin = this.getDataOrigin();

    //gets and filters data (selection options)
    this.subscription.add(
      this.form
        .get('search') //listens to whenever the search bar is touched
        .valueChanges.pipe(
          startWith(''), //emit 1 on initialization to init the data observable
          debounceTime(100) // debounce so we dont make too many selectors
        )
        .subscribe((filt) => {
          this.$answerSelection = this.dataOrigin.selector.pipe(
            filter((a) => !!a),
            map((data: any[]) =>
              data.filter((data) => this.dataOrigin.filterFunc(data, filt))
            )
          );
        })
    );
  }
  submit() {
    let answer = this.form.controls.answer.value;
    if (Array.isArray(answer)) answer = answer.length > 0 ? answer[0] : '';
    this.answer.emit({
      answer,
      question_id: this.question.id,
    });
  }
  /**
   *
   * this function returns the data observable and search filter function
   * based on the question type
   *
   * the selector is the place we get our data from
   * filterFunc is the function the SEARCH filters against
   */
  getDataOrigin(): DataOrigin {
    switch (this.question.question_type) {
      case this.questionTypes.players:
        return {
          selector: this.store.select(selectPlayers),
          filterFunc: (players: Player, filter: string) =>
            players.first_name.toUpperCase().includes(filter.toUpperCase()) ||
            players.last_name.toUpperCase().includes(filter.toUpperCase()),
        };
      case this.questionTypes.sports:
        return {
          selector: this.store.select(selectSports),
          filterFunc: (sport: Sport, filter: string) =>
            sport.name.toUpperCase().includes(filter.toUpperCase()),
        };
      case this.questionTypes.teams:
        return {
          selector: this.store.select(selectTeams),
          filterFunc: (team: Team, filter: string) =>
            team.full_name.toUpperCase().includes(filter.toUpperCase()),
        };
      case this.questionTypes.custom:
        return {
          //since custom data is coming straight within the question,
          //we wrap it in an observable to be compatible
          selector: new Observable((observer) => {
            observer.next(this.question.options);
            observer.complete();
          }),
          filterFunc: (question: CustomAnswerOption, filter: string) => {
            if (typeof question.custom_answer === 'number') {
              return question.custom_answer
                .toString()
                .toUpperCase()
                .includes(filter.toUpperCase());
            }
            return question.custom_answer
              .toUpperCase()
              .includes(filter.toUpperCase());
          },
        };
      default:
        //if question is sent improperly (no type)
        return {
          selector: new Observable(),
          filterFunc: () => undefined,
        };
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
