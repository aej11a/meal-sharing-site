import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { db } from '../firebase'

//Styles
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
}))

export default function RequestCard(mealName, hostName, status) {
    const { isMobile } = useViewport()
    const classes = useStyles()
    const { user } = useUser()
    const [requestData, setRequestData] = useState()
    const [mealData, setMealData] = useState()
    const [hostData, setHostData] = useState()

    /*
    const fetchRequests = async () => {
        try {
            let requestArray = []
            const requestRes = db
                .collection('meal-requests')
                .where('InviteeId', '==', user.uid)
            const querySnapshot = await requestRes.get()
            // if we find this meal in the meal requests where this user is invited, return yes, match found
            querySnapshot.forEach((doc) => {
                requestArray.push(doc.data())
            })
            return requestArray
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchMealData = async () => {
        const requestArray = await fetchRequests()
        let mealData = []
        requestArray.forEach((doc) => {
            try {
                let mealRes = await db.collection('meals').doc(doc.MealId).get()
                mealData.push(mealRes)
            }
            catch (error) {
                console.log(error)
            }
        })
        return mealData
    }
    */

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                let requestArray = []
                let mealArray = []
                let userArray = []
                const requestRes = db
                    .collection('meal-requests')
                    .where('InviteeId', '==', user.uid)
                const querySnapshot = await requestRes.get()
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        requestArray.push(doc.data())
                    })
                    setRequestData(requestArray)
                    querySnapshot.forEach(async (doc) => {
                        if (doc.data().MealId) {
                            const mealRes = await db
                                .collection('meals')
                                .doc(doc.data().MealId)
                                .get()
                            if (mealRes.exists) {
                                mealArray.push(mealRes.data())
                            } else {
                                console.log('No such document!')
                            }
                        }
                    })
                    setMealData(mealArray)
                    querySnapshot.forEach(async (doc) => {
                        if (doc.data().HostId) {
                            const userRes = await db
                                .collection(users)
                                .doc(doc.data().HostId)
                                .get()
                            if (userRes.exists) {
                                userArray.push(userRes.name)
                            } else {
                                console.log('No such document!')
                            }
                        }
                    })
                    setHostData(hostArray)
                } else {
                    console.log('No such document!')
                }
            } catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    }, [mealId])

    /*
    const innerContent = !mealName ? (
        <p>Loading...</p>
    ) : (
        //This is the ui for the requests
    )
    
    return isMobile ? (
        innerContent
    ) : (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Card className={classes.root}>{innerContent}</Card>
            </Grid>
        </Grid>
    )
    */
}
