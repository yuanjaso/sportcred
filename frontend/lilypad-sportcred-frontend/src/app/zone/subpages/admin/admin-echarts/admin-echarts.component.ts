import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Question } from 'src/app/login/login.types';
import { QuestionType } from '../../../../login/login.types';
import { QuestionnaireResponse } from '../admin.types';

@Component({
  selector: 'app-admin-echarts',
  templateUrl: './admin-echarts.component.html',
  styleUrls: ['./admin-echarts.component.scss'],
})
export class AdminEchartsComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() question: Question;
  @Input() rawData: QuestionnaireResponse;

  questionTypes = QuestionType;

  dataList;
  dataAxis;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.rawData?.currentValue !== undefined) {
      this.processData(changes.rawData.currentValue);
    }
  }
  ngOnInit(): void {}

  /**
   * takes in raw data and processes it to be able to be understood by echarts depending on question type
   * @param data data to be proccessed
   */
  processData(data: QuestionnaireResponse[]) {
    this.dataAxis = this.dataList = [];

    switch (this.question.question_type) {
      case QuestionType.quantitative:
        //here we fill dataAxis from min int to max int [minint, ..., 12,13,..., mmaxint]
        this.dataAxis = new Array(
          this.question.max_int - this.question.min_int + 1
        );
        for (let i = 0; i <= this.question.max_int - this.question.min_int; i++)
          this.dataAxis[i] = i + this.question.min_int;

        //here we generate a empty datalist of 0s, where the index is the age
        //, increment the index everytime we encounter that age
        this.dataList = new Array(
          this.question.max_int - this.question.min_int + 1
        ).fill(0);
        data.forEach((answer) => {
          this.dataList[answer.answer as number] += 1;
        });
        break;
      case QuestionType.sports:
      case QuestionType.players:
      case QuestionType.teams:
      case QuestionType.custom:
        console.log(data);
        let intermediate = {};

        data.forEach((answer) => {
          //since sports, players, teams all have a slightly different response scheme
          // we just try to all of them till we get one thats not undefined
          let key =
            (answer.answer as any)?.name ??
            (answer.answer as any)?.custom_answer ??
            (answer.answer as any)?.full_name;
          if (key in intermediate) {
            intermediate[key] += 1;
          } else {
            intermediate[key] = 1;
          }
        });

        //flatten intermediate into 2 synced lists
        let keys = Object.keys(intermediate);
        this.dataAxis = new Array(keys.length);
        this.dataList = new Array(keys.length);
        keys.forEach((el, index) => {
          this.dataAxis[index] = el;
          this.dataList[index] = intermediate[el];
        });
        break;
      case QuestionType.qualitative:
        this.dataList.paginator = this.paginator;
        this.dataList = [
          {
            user: { id: 12, username: 'bob' },
            answer: 'asdf',
          },
          {
            user: { id: 22, username: 'b2ob' },
            answer: 'asdf222',
          },
        ];
      default:
        break;
    }
  }
}
