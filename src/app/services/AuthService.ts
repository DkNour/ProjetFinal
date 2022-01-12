import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

import {Subject} from 'rxjs';

import { getAuth, GoogleAuthProvider } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userClaims: any;
    public userClaims$ = new Subject<any>();

    constructor(
        public afAuth: AngularFireAuth,
    ) {
    }


    getUserClaims(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    this.setUserClaims(user);
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    getUserToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    user.getIdToken().then(token => resolve(token)).catch(() => reject('No token Available.'));
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    setUserClaims(user: any): void {
        this.userClaims = user;
        this.userClaims$.next(user);
    }


    // doFacebookLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    // }
    //
    // doTwitterLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    // }

    doGoogleLogin(): Promise<any> {
        //const auth = getAuth();
        const provider = new GoogleAuthProvider();
        return this.afAuth.signInWithPopup(provider);
        
    }
    
    
      


    doLogout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!!this.afAuth.currentUser) {
                this.afAuth.signOut().then(() => {
                    this.setUserClaims(null);
                    resolve();
                }, err => reject(err));
            } else {
                reject();
            }
        });
    }

}
 