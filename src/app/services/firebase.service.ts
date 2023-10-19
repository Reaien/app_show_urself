import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { getFirestore, setDoc, doc, getDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //============Utilidades de autenticación===============

  auth = inject(AngularFireAuth);

  firestore = inject(AngularFirestore);

  login(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  registro(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email, user.password)
  }

  actualizarUsuario(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }
  

  //=======Email de recuperación=====
  recuperarPass(email: string){
    return sendPasswordResetEmail(getAuth(), email)
  }



  //=======Base de datos ===========
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }


  //=====Obtener info =======
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}
