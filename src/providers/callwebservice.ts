import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Callwebservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Callwebservice {

	posts = [];
  preferences = [];

  constructor(public http: Http) {
    console.log('Hello Callwebservice Provider');
    this.posts = [];
    this.preferences = [];
  }

  //create a user
  registerUsers(login,password,firstName,lastName,color){

    let body = JSON.stringify({'login' : login, 'password' : password, 'firstName' : firstName, 'lastName' : lastName, 'color' : color});
	let headers = new Headers({ 'Content-Type' : 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

	this.http
        .post('https://immense-lake-18614.herokuapp.com/register', body, options)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data.affectedRows);
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
    }


    //get all event from DataBase
    getEvent(){
  	this.http.get('https://immense-lake-18614.herokuapp.com/event').map(res => res.json()).subscribe(data => {
  		console.log(data);
  		this.posts = data;
  	});
  }


  //get event by date max vote
  getDataOrderByMaxVote(idevent){
  	this.http.get('https://immense-lake-18614.herokuapp.com/event/OrderByDateVote?idevent='+idevent).map(res => res.json()).subscribe(data => {
  		console.log(data);
  		this.posts = data;
  	});
  }

  //login
  /*loginUser(login,password){
    console.log("param"+login + " : "+password);
    let body = JSON.stringify({'login' : login, 'password' : password});
    let headers = new Headers({ 'Content-Type' : 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    this.http
        .post('https://immense-lake-18614.herokuapp.com/login', body, options)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
              this.posts = data;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
    }*/

}
