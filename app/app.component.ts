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
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
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
    this.items = af.list(this.msgVal, {
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
   return this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password)
   .then(()=>alert('successful login'))
   .catch(error => alert("invalid login"));

}
signup(email:string, password:string){
   return this.afAuth.auth.createUserWithEmailAndPassword(this.emailnew, this.passwordnew)
  .then(()=>alert("successfully signed up"))
  .catch(error => alert("invalid email or password"));

}
logout() {
    this.afAuth.auth.signOut();
}

Send(desc: string) {
    this.items.push({ message: desc});
    this.msgVal = '';
}
resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  
}