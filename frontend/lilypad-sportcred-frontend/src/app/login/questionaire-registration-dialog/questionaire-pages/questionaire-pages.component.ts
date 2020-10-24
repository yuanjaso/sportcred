import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { question, answer, questionTypes } from '../../login.types';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import { selectPlayers, selectTeams } from '../../../zone/store/selectors';
import { first } from 'rxjs/operators';
import { sportStrings } from '../../../zone/zone.types';
@Component({
  selector: 'app-questionaire-pages',
  templateUrl: './questionaire-pages.component.html',
  styleUrls: ['./questionaire-pages.component.scss'],
})
export class QuestionairePagesComponent implements OnInit {
  @Input() question: question = undefined;

  //custom filter is to further filter response type, for example if we
  // want all teams only in the eastern conference...
  // only applicable to questions with a select range of responses ('Lakers', 'Raptors'...)
  @Input() customFilter: Function;
  @Input() outOf: String = '';
  @Output() answer = new EventEmitter<answer>();
  form: FormGroup = new FormGroup({
    number: new FormControl(0),
    string: new FormControl(''),
  });

  //observables
  $players = this.store.select(selectPlayers);
  $teams = this.store.select(selectTeams);

  // create this local variable to access in html
  sportStrings = sportStrings;
  questionTypes = questionTypes;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log(this.question.question_type);
    console.log(questionTypes.players);
  }
  submit() {
    let answer =
      this.question.question_type === this.questionTypes.quantitative
        ? this.form.controls.number.value
        : this.form.controls.string.value;
    this.answer.emit({
      answer,
      question_id: this.question.id,
    });
  }
}
