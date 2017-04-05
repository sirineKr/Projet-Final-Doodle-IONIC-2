import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterPage } from '../register/register';
import { EventPage } from '../event/event';
import { Callwebservice } from '../../providers/callwebservice';



/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	  slideOneForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public auth:Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController, public callws: Callwebservice, public http: Http) {
  	this.slideOneForm = formBuilder.group({
        login: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],        
        password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Pour acceder au formulaire de l'inscription
  clickRegister(){
  	this.navCtrl.setRoot(RegisterPage);
  }


  //Pour acceder à son espace
  signin(){
    if(this.slideOneForm.value.login === '' || this.slideOneForm.value.password === '') {
        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }
    
    console.log("avant :"+this.slideOneForm.value.login +" "+this.slideOneForm.value.password);
    let body = JSON.stringify({'login' : this.slideOneForm.value.login, 'password' : this.slideOneForm.value.password});
    let headers = new Headers({ 'Content-Type' : 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    this.http
        .post('https://immense-lake-18614.herokuapp.com/login', body, options)
        .map(res => res.json())
        .subscribe(
            data => {
              if(typeof data[0] == 'undefined'){
                console.log("no !");
                this.redirection("no !","","","","");
              }else{
                 if((data[0].login == this.slideOneForm.value.login) && (data[0].password == this.slideOneForm.value.password)){
                  console.log("yes !")
                  console.log(data[0].login,data[0].lastName,data[0].firstName,data[0].couleur);
                  this.redirection("yes",data[0].login,data[0].nom,data[0].prenom,data[0].couleur);
                }else{
                console.log("no !");
                this.redirection("no !","","","","");
                } 
              }
              
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );

  }
  
  
 redirection(msg,id,firstName,lastName,couleur){
    if(msg == "yes")
    {
        let loader = this.loadingCtrl.create({
            content: "Logging in...",
            duration: 1000
        });
        loader.present();
        console.log(msg,id,firstName,lastName);
        this.navCtrl.push(EventPage, {
            param1: id, param2: firstName, param3: lastName, param5:couleur
        });
    }else
    {
        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:'Check your fields !',
          buttons:['OK']
        });
        alert.present();
    }
 }

}
