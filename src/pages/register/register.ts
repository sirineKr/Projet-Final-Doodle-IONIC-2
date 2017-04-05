import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { Callwebservice } from '../../providers/callwebservice';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	slideOneForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public callws: Callwebservice, public alertCtrl: AlertController, public http: Http) {
  	this.slideOneForm = formBuilder.group({
        login: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],        
        password: ['', Validators.required],
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        color: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  //Pour acceder au formulaire de connexion
  clickLogin(){
     this.navCtrl.setRoot(LoginPage); 
  }

  //créer un compte
  createAccount(){
  	if(!this.slideOneForm.valid){
      let alert = this.alertCtrl.create({
        title: 'Error :',
        subTitle: 'Check your fields !',
        buttons: ['OK']
      });
    alert.present();
    } 
    else 
    {
        
        let body = JSON.stringify({'login' : this.slideOneForm.value.login, 'password' : this.slideOneForm.value.password, 'firstName' : this.slideOneForm.value.firstName, 'lastName' : this.slideOneForm.value.lastName, 'color' : this.slideOneForm.value.color});
	    let headers = new Headers({ 'Content-Type' : 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });

	    this.http
        .post('https://immense-lake-18614.herokuapp.com/register', body, options)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data.affectedRows);
              if(data.affectedRows == 1){
                let alert = this.alertCtrl.create({
                    title: 'Confirmation :',
                    subTitle: 'Account created !',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.setRoot(LoginPage);
              }
            },
            err => {
              let alert = this.alertCtrl.create({
                    title: 'Error :',
                    subTitle: 'user exist  !',
                    buttons: ['OK']
                });
                alert.present();
            }
        );
        
        
        
    }
  }
  

}
