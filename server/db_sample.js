const firebase = require('firebase')

db = firebase.firestore()

const docRef = db.collection('users').doc('alovelace')

docRef
    .set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
    })
    .then((result) => console.log(result))

module.exports = db
