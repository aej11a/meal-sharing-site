import firebaseLib from 'firebase'
//import 'firebase/storage'

export const firebase = firebaseLib.initializeApp({
    apiKey: 'AIzaSyDTcOhMHYO4q9iqKBD75sicIxiBLJnFS2s',
    authDomain: 'meal-sharing-4e92e.firebaseapp.com',
    projectId: 'meal-sharing-4e92e',
    storageBucket: 'meal-sharing-4e92e.appspot.com',
    messagingSenderId: '760425941932',
    appId: '1:760425941932:web:52245590ebd6b7b85ac809',
})

export const db = firebase.firestore()
export const storage = firebase.storage() //root reference

require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
