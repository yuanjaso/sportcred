import { Pipe, PipeTransform } from '@angular/core';
import { Question, QuestionName } from 'src/app/login/login.types';
import { GroupedQuestions } from './admin.types';

@Pipe({
  name: 'formatQuestions',
})
export class FormatQuestionsPipe implements PipeTransform {
  transform(questions: Question[]): GroupedQuestions {
    let groupByType: GroupedQuestions = {};
    questions.forEach((q) => {
      let key = QuestionName[q.question_type];
      if (key in groupByType) {
        groupByType[key].push(q);
      } else {
        groupByType[key] = [q];
      }
    });
    return groupByType;
  }
}
