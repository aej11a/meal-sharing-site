require('dotenv').config()
const firebase = require('firebase/app')
require('firebase/firestore')
var express = require('express')
var app = express()

firebase.initializeApp({
    apiKey: 'AIzaSyDTcOhMHYO4q9iqKBD75sicIxiBLJnFS2s',
    authDomain: 'meal-sharing-4e92e.firebaseapp.com',
    projectId: 'meal-sharing-4e92e',
    storageBucket: 'meal-sharing-4e92e.appspot.com',
    messagingSenderId: '760425941932',
    appId: '1:760425941932:web:52245590ebd6b7b85ac809',
})

//require('./db_sample')
require('./forward-geocoding')

app.get('/sample', require('./api/sample'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
