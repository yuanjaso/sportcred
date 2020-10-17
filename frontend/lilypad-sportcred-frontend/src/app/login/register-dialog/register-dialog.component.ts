import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tryRegister, getQuestionaire } from '../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { generalRegistrationInfo, question, answer } from '../models';
import { selectQuestionaire } from '../store/selectors';
import { first } from 'rxjs/operators';
import { SwiperComponent, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  swiperConfig = {
    allowTouchMove: false,
  };
  swiperIndex = 0;

  //questions we get from the backend
  questionaire: question[] = undefined;
  questionairLength: number = 0;

  //the user's response to the questions and general info
  generalInfoResponse: generalRegistrationInfo = undefined;
  questionaireResponse: answer[] = [];

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getQuestionaire());
    //todo loading icons
    this.store
      .select(selectQuestionaire)
      //.pipe(first((inp) => inp !== undefined))
      .subscribe((questionaire) => {
        //get questionaire from store
        this.questionaire = questionaire;
        //mock
        this.questionaire = [
          {
            id: 12,
            question_content: 'How much do you like Hats?',
            is_qualitative: false,
            min_int: 1,
            max_int: 10,
          },
          {
            id: 122,
            question_content: 'What is your opinion on ... ... ...',
            is_qualitative: true,
            min_int: 1,
            max_int: 3,
          },
        ];
        this.questionairLength = this.questionaire.length;
      });
  }
  getFirstPageInfo(info: generalRegistrationInfo) {
    this.generalInfoResponse = info;
    this.proceedSlide();
  }
  getAnswer(e) {
    this.questionaireResponse.push(e);
    this.proceedSlide();
  }
  register() {
    //info in generalInfoResponse and questionaireResponse should be validated

    this.store.dispatch(
      tryRegister({
        ...this.generalInfoResponse,
        questionaires: this.questionaireResponse,
      })
    );
    this.onNoClick();
  }

  getOutOf(i: number) {
    return `${i + 1}/${this.questionairLength}`;
  }
  proceedSlide() {
    if (!this.swiper || !this.swiper.directiveRef) return;
    if (this.swiper.index >= this.questionairLength) {
      //if we are at last slide, try to register
      //NOTE this conditional takes into account the 1 more slide hack
      this.register();
    } else {
      this.swiper.directiveRef.nextSlide();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
