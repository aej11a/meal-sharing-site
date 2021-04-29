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

export const doesRequestExist = async (mealId, inviteeId) => {
    try {
        let foundAMatch = false
        const requestRes = db
            .collection('meal-requests')
            .where('InviteeId', '==', inviteeId)
        const querySnapshot = await requestRes.get()
        // if we find this meal in the meal requests where this user is invited, return yes, match found
        querySnapshot.forEach((doc) => {
            if (doc.data().MealId === mealId) {
                foundAMatch = true
            }
        })
        return foundAMatch
    } catch (error) {
        console.log(error)
        return null
    }
}
