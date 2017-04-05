import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  clickRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }

  clickLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
