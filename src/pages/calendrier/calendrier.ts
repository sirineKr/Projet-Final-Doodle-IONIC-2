import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import { MaxvotePage } from '../maxvote/maxvote';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { Callwebservice } from '../../providers/callwebservice';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Calendrier page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendrier',
  templateUrl: 'calendrier.html'
})
export class CalendrierPage {
  
  id = this.navParams.get('param1'); 
  firstName =  this.navParams.get('param2');
  lastName = this.navParams.get('param3'); 
  idevent  = this.navParams.get('param4');
  couleur = this.navParams.get('param5');
  
  
  //les caracteristiques du calendrier  
  
   calendarOptions:Object = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public callws: Callwebservice, public http: Http, private app:App) {
      
      
        console.log("id event :"+this.idevent);
        
        this.calendarOptions = {
        height: 'parent',
        fixedWeekCount : false,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        header: {
        		left: 'promptResource today ',
				center: 'prev title next',
				right: ''
		    },
        events : function(start, end, timezone, callback) {
            $.ajax(
            {
                type:'GET',
                url:'https://immense-lake-18614.herokuapp.com/event/preference',
                data:{"idevent": navParams.get('param4')},
                dataType: 'json',
                success: function(data){
                    var jsonData = [];
                    for (var _i = 0; _i < data.length; _i++) {

                    jsonData.push({
                            title: data[_i].login,
                            start: data[_i].datepref,
                            color: data[_i].couleur
                        });
                
                  }
                  console.log(jsonData);
                  callback(jsonData);
                },error : function(){
                    return []
                }
            }); 
        },
        dayClick : function(date, jsEvent, view){
            $.ajax(
            {
                type:'POST',
                url:'https://immense-lake-18614.herokuapp.com/addpreference',
                data:{"iduser" : navParams.get('param1'), "idevent": navParams.get('param4'), "datepref" : date.format()},
                success: function(data){
                  if(data.affectedRows == 1){
                  $("#mycall").fullCalendar('renderEvent',{title: navParams.get('param1'), start: date.format(), end: date.format(), color: navParams.get('param5')},true);
                    alert("vote added for "+date.format()+" !");}
                  else{
                    alert("you have voted before ! ");  
                  }
                },error : function(){
                  
                }
            });
            
        }
      };
  }


  //fonction sera appelé automatiquement lors du chargement de la page
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendrierPage');
    
  }

  changeMode(){
    this.navCtrl.push(MaxvotePage, {
            param1: this.id, param2: this.firstName, param3: this.lastName, param4: this.idevent
        });
  }

  listEvent(){
    this.navCtrl.push(EventPage, {
            param1: this.id, param2: this.firstName, param3: this.lastName
        });
  }
  
  logout(){
    //clear any cached data
    this.app.getRootNav().setRoot(HomePage);
  }
}
