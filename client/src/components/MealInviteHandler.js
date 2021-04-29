import { ContactSupportOutlined } from '@material-ui/icons'
import React from 'react'
import { db } from '../firebase'

export const newRequest = (hostId, mealId, inviteeId) => {
    db.collection('meal-requests')
        .add({
            HostId: hostId,
            MealId: mealId,
            InviteeId: inviteeId,
            Status: 'Pending',
            isRequest: true, //difference between meal requests and meal invites
        })
        .then(console.log('Meal Request Added.'))
        .catch((error) => {
            console.error('Error adding request: ', error)
        })
}

export const getRequest = (requestID) => {
    let requestData
    const fetchData = async () => {
        try {
            const requestRes = await db
                .collection('meal-requests')
                .doc(requestID)
                .get()
            if (requestRes.exists) {
                requestData = requestRes.data()
            } else {
                console.log('No such request.')
            }
        } catch (error) {
            console.log('Error getting document:', error)
        }
    }
    fetchData()
    return requestData
}

export const searchRequest = async (hostId, mealId, inviteeId) => {
    try {
        const requestRes = db
            .collection('meal-requests')
            .where('InviteeId', '==', inviteeId)
        const querySnapshot = await requestRes.get()
        querySnapshot.forEach((doc) => {
            if (doc.data().HostId === hostId && doc.data().MealId === mealId) {
                return true
            }
        })
        return false
    } catch (error) {
        console.log(error)
        return null
    }
}

/*
export const searchRequest = async (hostId, mealId, inviteeId) => {
    const queryRequest = () => {
        let query = []
        let res
        const requestRes = db
            .collection('meal-requests')
            .where('InviteeId', '==', inviteeId)
        requestRes
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    query.push(doc.data())
                })
            })
            .then((doc) => {
                if (doc.HostId === hostId && doc.MealId === mealId) {
                    res = true
                }
                res = false
            })
        return res
    }

    const requestRes = queryRequest()

    console.log(requestRes)

    //returns false for debug purposes; should return a variable boolean
    return false
}
*/
