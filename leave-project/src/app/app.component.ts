import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { EmailService } from './services/email.service';



interface selectModel {
  name: string;
  value: string;
}
export const MY_FORMATS = { parse: { dateInput: 'LL', }, display: { dateInput: 'LL', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY', }, };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    // { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS }
  ]
})
export class AppComponent {
  constructor(
    private elementRef: ElementRef,
    private emailService:EmailService
  ) { }
  title = 'leave-project';
  userName: string = '';
  reason: string = '';

  reasonRadio: '0' | '1' = '0';

  date = moment(new Date());
  // startDate = moment(new Date());
  action: '0' | '1' | '2' | '3' = '0';
  startTime = '09:00';
  endTime = '09:30';
  content = '';

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  members: selectModel[] = [
    { name: 'EnPeiLo【羅恩培】', value: 'EnPeiLo【羅恩培】' },
    { name: 'MisuSu【蘇亭郡】', value: 'MisuSu【蘇亭郡】' },
    { name: 'MichelleHsieh【謝婷蓁】', value: 'MichelleHsieh【謝婷蓁】' },
    { name: 'BenChen【陳穎斌】', value: 'BenChen【陳穎斌】' },
    { name: 'TinaDeng【鄧子涵】', value: 'TinaDeng【鄧子涵】' },
    { name: 'IvanChung【鍾伊鎧】', value: 'IvanChung【鍾伊鎧】' },
    { name: 'MattWu【吳維珉】', value: 'MattWu【吳維珉】' },
    { name: 'VanessaHsu【許澐易】', value: 'VanessaHsu【許澐易】' },
    { name: 'JungKang【康家榮】', value: 'JungKang【康家榮】' },
    { name: 'ArthurYu【游超能】', value: 'ArthurYu【游超能】' },
    { name: 'IanLau【劉昱揚】', value: 'IanLau【劉昱揚】' },
    { name: 'LewisLin【林紀霖】', value: 'LewisLin【林紀霖】' },
    { name: 'StephenChang【張世賢】', value: 'StephenChang【張世賢】' },
    { name: 'XavierKuo【郭嘉元】', value: 'XavierKuo【郭嘉元】' },
    { name: 'SkyChen【陳建成】', value: 'SkyChen【陳建成】' },
    { name: 'AndyKYChen【陳冠瑜】', value: 'AndyKYChen【陳冠瑜】' },
    { name: 'AllenLee【李東昇】', value: 'AllenLee【李東昇】' },
  ];

  reasons: selectModel[] = [
    { name: '身體不適', value: '身體不適' },
    { name: '個人事務處理', value: '個人事務處理' },
    { name: '路上塞車', value: '路上塞車' },
    { name: '私事待辦', value: '私事待辦' },
    { name: '休假', value: '休假' },
    { name: '醫院回診', value: '醫院回診' },
    { name: '內部訓練', value: '內部訓練' },
  ];

  create(): void {
    const tempDate = `${this.date.month() + 1}/${this.date.date()}`
    this.content = `- 請假人員：${this.userName}\n- 請假時間：${tempDate} ${this.startTime}-${this.endTime} \n- 請假事由：${this.reason}`

  }
  actionChange(): void {
    switch (this.action) {
      case '0':
        this.startTime = '09:00';
        this.endTime = '09:30';
        break;
      case '1':
        this.startTime = '09:00';
        this.endTime = '17:30';
        break;
      case '2':
        this.startTime = '09:00';
        this.endTime = '12:00';
        break;
      case '3':
        this.startTime = '13:00';
        this.endTime = '17:30';
        break;
    }
  }

  copy(selector: string): void{
    const input = this.elementRef.nativeElement.querySelector(selector);
    input.select();
    document.execCommand('copy');
  }

  ngOnInit(): void {

  }

  sendMail(): void{
    let email = this.content;
    let reqObj = {
      email: email
    }
    this.emailService.sendMessage(reqObj).subscribe((v: any) =>{
      console.log(v);
    })
  }
}

