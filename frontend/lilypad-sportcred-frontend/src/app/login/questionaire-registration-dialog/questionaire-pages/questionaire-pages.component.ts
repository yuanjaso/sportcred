import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, Answer, QuestionType } from '../../login.types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import {
  selectPlayers,
  selectTeams,
  selectSports,
} from '../../../zone/store/selectors';
import { Observable } from 'rxjs';
import { Player, Sport, Team } from 'src/app/zone/zone.types';
import { filter } from 'lodash';
@Component({
  selector: 'app-questionaire-pages',
  templateUrl: './questionaire-pages.component.html',
  styleUrls: ['./questionaire-pages.component.scss'],
})
export class QuestionairePagesComponent implements OnInit {
  @Input() question: Question = undefined;

  //custom filter is to further filter response type, for example if we
  // want all teams only in the eastern conference...
  // only applicable to questions with a select range of responses ('Lakers', 'Raptors'...)
  @Input() customFilter: () => boolean;
  @Input() outOf: String = '';
  @Output() answer = new EventEmitter<Answer>();

  form: FormGroup = new FormGroup({
    answer: new FormControl(undefined, [Validators.required]),
  });

  //data observables
  $players: Observable<Player[]> = undefined;
  $teams: Observable<Team[]> = undefined;
  $sports: Observable<Sport[]> = undefined;

  // create this local variable to access in html
  questionTypes = QuestionType;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //set data observables
    this.$players = this.store.select(selectPlayers);
    this.$teams = this.store.select(selectTeams);
    this.$sports = this.store.select(selectSports);
  }
  submit() {
    let answer = this.form.controls.answer.value;
    if (Array.isArray(answer)) answer = answer.length > 0 ? answer[0] : '';
    this.answer.emit({
      answer,
      question_id: this.question.id,
    });
  }
}
