import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalendrierPage } from '../pages/calendrier/calendrier';
import { EventPage } from '../pages/event/event';
import { LoginPage } from '../pages/login/login';
import { MaxvotePage } from '../pages/maxvote/maxvote';
import { RegisterPage } from '../pages/register/register';
import { Callwebservice } from '../providers/callwebservice';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular'


import { CalendarComponent } from "../../node_modules/angular2-fullcalendar/src/calendar/calendar";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CalendarComponent,
    CalendrierPage,
    EventPage,
    LoginPage,
    MaxvotePage,
    RegisterPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalendrierPage,
    EventPage,
    LoginPage,
    MaxvotePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},Callwebservice
  ]
})
export class AppModule {}
