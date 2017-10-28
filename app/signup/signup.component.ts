import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";
import * as firebase from 'firebase/app';
import { log } from "util";
import 'rxjs/add/operator/switchMap';
import { User } from "firebase/app";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

   currentUser: User;
  uid:string;
  username:string="";
  value1: boolean = true;
  value2: boolean=true;
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = 't';
email:string='';
password='';
emailnew="";
passwordnew="";

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,) {
    this.items = af.list('/users/{{msgVal}}', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;
   
    
  
  }
  
  googleLogin() {
     const provider = new firebase.auth.GoogleAuthProvider()
     return this.afAuth.auth.signInWithPopup(provider)
       .then(() =>  console.log('successful auth'))
       .catch(error => console.log(error));
      }
login() {
    this.afAuth.auth.signInAnonymously();
   
}
login1(email:string,password:string){
   this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password);

}
signup(email:string, password:string){
  this.afAuth.auth.createUserWithEmailAndPassword(this.emailnew, this.passwordnew);
}
logout() {
    this.afAuth.auth.signOut();
}

Send(desc: string) {
    this.msgVal=desc;
    
}

}