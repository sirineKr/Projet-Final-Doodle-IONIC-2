import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Callwebservice } from '../../providers/callwebservice';
import { CalendrierPage } from '../calendrier/calendrier';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';

/*
  Generated class for the Maxvote page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-maxvote',
  templateUrl: 'maxvote.html'
})
export class MaxvotePage {
    
  id = this.navParams.get('param1'); 
  firstName =  this.navParams.get('param2');
  lastName = this.navParams.get('param3'); 
  idevent = this.navParams.get('param4');

  constructor(public navCtrl: NavController, public navParams: NavParams, public callws: Callwebservice, private app:App) {
      console.log(this.idevent);
  }

  ionViewDidLoad() {
    this.callws.getDataOrderByMaxVote(this.idevent);
  }


  listEvent(){
  	this.navCtrl.setRoot(EventPage);
  }
  
  logout(){
    //clear any cached data
    this.app.getRootNav().setRoot(HomePage);
  }
}
