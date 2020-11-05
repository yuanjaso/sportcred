import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Question } from 'src/app/login/login.types';
import { getQuestionaire } from '../../../login/store/actions';
import { selectQuestionaire } from '../../../login/store/selectors';
import { AppState } from '../../../store/reducer';
import { AdminService } from './admin.service';
import { QuestionnaireResponse } from './admin.types';
import { getQuestionnaireResponse } from './store/admin.actions';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  subscriptions = new Subscription();
  //currentPageNum represents the current query page we are on,
  // as user loads more responses, our page num goes up and up
  // when user selects a different statistic to view, currentPageNum resets to 0
  currentSelectedQuestion = {
    rawdata: undefined,
    question: undefined,
  };
  constructor(
    private store: Store<AppState>,
    private adminService: AdminService
  ) {
    this.clearQuestionnaireData();
  }

  questionControl;
  $questionnaires: Observable<Question[]>;
  ngOnInit(): void {
    //load in questionnaires if we didnt yet
    this.store
      .select(selectQuestionaire)
      .pipe(first((a) => a === undefined))
      .subscribe(() => this.store.dispatch(getQuestionaire()));
    //listen and map the question drop down
    this.$questionnaires = this.store.select(selectQuestionaire);

    this.subscriptions.add(
      this.adminService.$freshQuestionnairResponses.subscribe(
        (response: QuestionnaireResponse) => {
          response = cloneDeep(response);
          this.currentSelectedQuestion.rawdata = response;
        }
      )
    );
  }

  getNewQuestionnaireResponse(e) {
    this.store.dispatch(
      getQuestionnaireResponse({
        question_id: e.value.id,
      })
    );
    this.clearQuestionnaireData();
    this.currentSelectedQuestion.question = e.value;
  }

  clearQuestionnaireData() {
    this.currentSelectedQuestion = {
      rawdata: undefined,
      question: undefined,
    };
  }
}
