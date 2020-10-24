import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tryRegisterQuestionaire, getQuestionaire } from '../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { question, answer } from '../login.types';
import { selectQuestionaire } from '../store/selectors';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import { first } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-questionaire-registration-dialog',
  templateUrl: './questionaire-registration-dialog.component.html',
  styleUrls: ['./questionaire-registration-dialog.component.scss'],
})
export class QuestionaireRegistrationDialogComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  swiperConfig = {
    allowTouchMove: false,
  };
  swiperIndex = 0;

  //questions we get from the backend
  questionaire: question[] = undefined;
  questionairLength: number = -1;

  //the user's response to the questions and general info
  questionaireResponse: answer[] = [];

  constructor(
    public dialogRef: MatDialogRef<QuestionaireRegistrationDialogComponent>,
    private store: Store<AppState>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.store.dispatch(getQuestionaire());
    this.store
      .select(selectQuestionaire)
      .pipe(first((inp) => inp !== undefined))
      .subscribe((questionaire) => {
        //get questionaire from store

        this.questionaire = cloneDeep(questionaire);
        this.questionairLength = this.questionaire.length;

        // //TODO REMOVE
        // //test QUESTION for PLAYERS
        // this.questionairLength = this.questionaire.push({
        //   id: 7,
        //   max_int: null,
        //   min_int: null,
        //   question_content: 'Who is your favorite player?',
        //   question_type: 'P',
        // });
        // //END TODO
      });
  }
  getAnswer(e) {
    this.questionaireResponse.push(e);
    this.proceedSlide();
  }
  registerQuestionaire() {
    //info in generalInfoResponse and questionaireResponse should be validated

    this.store.dispatch(
      tryRegisterQuestionaire({
        questionaire: this.questionaireResponse,
      })
    );
    this.onNoClick();
  }

  getOutOf(i: number) {
    return `${i + 1}/${this.questionairLength}`;
  }
  proceedSlide() {
    if (!this.swiper || !this.swiper.directiveRef) return;
    if (this.swiper.index == this.questionairLength - 1) {
      //if we are at last slide, try to register the questionaire
      //NOTE this conditional takes into account the 1 more slide hack
      this.registerQuestionaire();
    } else {
      this.swiper.directiveRef.nextSlide();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
