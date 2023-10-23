import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //utilidades de autenticación

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  login(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  registro(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email, user.password)
  }

  actualizarUsuario(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
  }
  

  //Email de recuperación
  recuperarPass(email: string){
    return sendPasswordResetEmail(getAuth(), email)
  }

    //setear info usuarios
  //usado para guardar datos de un usuario, estos quedaran con un id
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }




  // Metodos para interactuar con la base de datos

  //obtener todos los datos de los videos
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }




  //Obtener info
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //agregar 
  //se agregaran videos 
  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(), path), data);
  }

  //modificar 
  //se modifican videos 
  modificarDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  //borrar 
  //se borran videos 
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path));
  }



  //storage de firebase
  //para almacenar imagenes y videos en firebase
  async imagenSubida(path: string, data_url: string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then (() =>{
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  //obtener url de la imagen/video para reemplazarla en la funcion de actualizar video en la imagen
  async obtenerUrlImagen(url: string){
    return ref(getStorage(), url).fullPath
  }

  borrarArchivo(path: string){
    return deleteObject(ref(getStorage(), path))
  }

}
