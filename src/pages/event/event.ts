import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Callwebservice } from '../../providers/callwebservice';
import { CalendrierPage } from '../calendrier/calendrier';
import { HomePage } from '../home/home';

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
id = this.navParams.get('param1'); 
firstName =  this.navParams.get('param2');
lastName = this.navParams.get('param3');
couleur = this.navParams.get('param5');
  constructor(public navCtrl: NavController, public navParams: NavParams, public callws: Callwebservice, private app:App) {

  }

  ionViewDidLoad() {
    this.callws.getEvent();
  }

  clickEvent(post){
      console.log(post);
  	this.navCtrl.push(CalendrierPage, {
            param1: this.id, param2: this.firstName, param3: this.lastName, param4: post.id, param5: this.couleur
        });
  }
  
  
  logout(){
    //clear any cached data
    this.app.getRootNav().setRoot(HomePage);
  }
  
}
