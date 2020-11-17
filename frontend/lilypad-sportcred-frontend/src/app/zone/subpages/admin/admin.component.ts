import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Question } from 'src/app/login/login.types';
import { getQuestionaire } from '../../../login/store/actions';
import { selectQuestionaire } from '../../../login/store/selectors';
import { AppState } from '../../../store/reducer';
import * as types from '../../zone-home/subpages/debate/debate.types';
import { getDebateTopics } from '../../zone-home/subpages/debate/store/debate.actions';
import { selectAllDebateTopics } from '../../zone-home/subpages/debate/store/debate.selectors';
import { AddDebateDialogComponent } from './add-debate-dialog/add-debate-dialog.component';
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
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.clearQuestionnaireData();
  }

  questionControl;
  $questionnaires: Observable<Question[]>;

  topics: types.DebateTopic[] = undefined;
  debateTableData;
  debateTableColumns = ['id', 'title', 'num_of_comments'];

  @ViewChild(MatPaginator) pages: MatPaginator;

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
    // Load active debate topics
    this.store.dispatch(getDebateTopics());
    this.subscriptions.add(
      this.store
        .select(selectAllDebateTopics)
        .pipe(filter((a) => !!a && (a as any)?.length))
        .subscribe((a: types.DebateTopic[]) => {
          this.topics = a;
          this.debateTableData = new MatTableDataSource<types.DebateTopic>(
            this.topics
          );
          this.debateTableData.paginator = this.pages;
        })
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

  addNewDebate() {
    const dialog = this.dialog.open(AddDebateDialogComponent);
  }
}
