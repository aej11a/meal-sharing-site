import React from 'react'
import { firebase } from './firebase'

export const addMealData = (payload) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const firestore = getFirestore()
            firestore
                .collection('meals')
                .doc() //Ask about meal IDs
                .add({
                    name: payload.mealName,
                    type: payload.mealType,
                    ingredients: payload.mealIngredients,
                    numGuests: payload.mealGuestsNum,
                    fee: payload.mealGuestFee,
                    time: payload.mealTime,
                    location: payload.mealLocation,
                    expire: payload.mealExpiration,
                })
        } catch (err) {
            console.log(err)
        }
    }
}

/*
export const getMealData = (e) => {
    const docRef = database.collection("meals").doc('O6m4TFfIjE42ZaNfvC7s');

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
*/
