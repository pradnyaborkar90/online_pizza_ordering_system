import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";
import * as firebase from 'firebase/app';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-personal',
  templateUrl: 'personal.component.html',
  styleUrls: ['personal.component.css'],

})
export class PersonalComponent {
  name: any;
  user: Observable<firebase.User>;
  items: FirebaseListObservable<Object[]>;
  cart:FirebaseListObservable<Object[]>;
  msgVal: string = 't';
  total: number =0;
form;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    /*this.items = af.list(this.msgVal, {
      query: {
        limitToLast: 50
      }
    });
*/
this.items=this.af.list('users');
this.cart=this.af.list('userdata');
    this.user = this.afAuth.authState;
    
  }
login() {
    this.afAuth.auth.signInAnonymously();
}

logout() {
    this.afAuth.auth.signOut();
}

Send(desc) {
    desc.user=(this.name);
    
}
 delete(desc){
 this.items.remove(desc);
 console.log(desc);
}
onSubmit=function(user){
  this.items.push({user} );
 
}
ngOnInit(){
  this.form=new FormGroup({
    url: new FormControl(""),
    describe: new FormControl("")
  });
}
edit(desc){
  desc.user.url=this.name;
 console.log(desc);
 
} 
sum(desc){
  this.total = this.total + desc.message2;
  console.log(this.total);
  this.cart.push({desc});
}


}
