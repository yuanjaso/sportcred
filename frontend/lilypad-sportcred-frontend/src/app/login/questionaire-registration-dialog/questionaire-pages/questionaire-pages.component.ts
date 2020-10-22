import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { question, answer, questionTypes } from '../../login.types';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-questionaire-pages',
  templateUrl: './questionaire-pages.component.html',
  styleUrls: ['./questionaire-pages.component.scss'],
})
export class QuestionairePagesComponent implements OnInit {
  @Input() question: question = undefined;
  @Input() outOf: String = '';
  @Output() answer = new EventEmitter<answer>();
  form: FormGroup = new FormGroup({
    number: new FormControl(0),
    string: new FormControl(''),
  });

  // create this local variable to access in html
  quantitative = questionTypes.quantitative;
  constructor() {}

  ngOnInit(): void {}
  submit() {
    let answer =
      this.question.question_type === this.quantitative
        ? this.form.controls.number.value
        : this.form.controls.string.value;
    this.answer.emit({
      answer,
      question_id: this.question.id,
    });
  }
}
