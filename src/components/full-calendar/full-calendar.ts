import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from "../../../node_modules/angular2-fullcalendar/src/calendar/calendar";
import * as $ from 'fullCalendar';


/*
  Generated class for the FullCalendar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'full-calendar',
  templateUrl: 'full-calendar.html'
})
export class FullCalendarComponent {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;


  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
    console.log("hi");
  }

  constructor() {
    console.log('Hello FullCalendar Component');
  }

}
