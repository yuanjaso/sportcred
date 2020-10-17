import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { question, answer } from '../../models';
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
  constructor() {}

  ngOnInit(): void {}
  submit() {
    let answer = this.question.is_qualitative
      ? this.form.controls.string.value
      : this.form.controls.number.value;

    this.answer.emit({
      answer,
      question: this.question,
    });
  }
}
