import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { db } from '../firebase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LocationPinIcon from '@material-ui/icons/LocationOn'
import CalendarIcon from '@material-ui/icons/Today'
import ExpirationIcon from '@material-ui/icons/TimerOff'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { makeStyles } from '@material-ui/core/styles'
import { useViewport } from '../use-viewport'
import { useUser } from '../App'

//Styles
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
}))

export function RequestCard() {
    const { isMobile } = useViewport()
    const classes = useStyles()
    const { user } = useUser()
    const [requestData, setRequestData] = useState()
    const [mealData, setMealData] = useState()
    const [hostData, setHostData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                let requestArray = []
                let userArray = []
                const requestRes = db
                    .collection('meal-requests')
                    .where('InviteeId', '==', user.uid)
                const querySnapshot = await requestRes.get()
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        requestArray.push(doc.data())
                    })
                    await Promise.all(requestArray)
                    setRequestData(requestArray)
                    if (requestArray.length > 0) {
                        // map means "for each (X) in array, (do something to X) to (make corresponding element Y in the new array)"
                        // so here it means "for each (element in requestArray), (run a query) and (put the promise in the queries array)"
                        const queries = requestArray.map(async (doc) => {
                            const mealRes = await db
                                .collection('meals')
                                .doc(doc.MealId)
                                .get()
                            if (mealRes.exists) {
                                return mealRes.data()
                            } else {
                                console.log('No such document!')
                            }
                        })
                        await Promise.all(queries)
                        // console.log(queries) shows whats supposed to be in mealData. setMealData does not work
                        setMealData(queries) //Not working?
                    }
                    querySnapshot.forEach(async (doc) => {
                        const userRes = await db
                            .collection('users')
                            .doc(doc.data().HostId)
                            .get()
                        if (userRes.exists) {
                            userArray.push(userRes.data().name)
                        } else {
                            console.log('No such document!')
                        }
                    })
                    setHostData(userArray)
                } else {
                    console.log('No such document!')
                }
            } catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    }, [])

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                let mealArray = []
                if(requestData){
                    requestData.forEach(async (doc) => {
                        const mealRes = await db
                            .collection('meals')
                            .doc(doc.MealId)
                            .get()
                        if (mealRes.exists) {
                            mealArray.push(mealRes.data())
                        } else {
                            console.log('No such document!')
                        }
                    })
                    setMealData(mealArray) //Not working?
                    console.log(mealArray)
                } else {
                    console.log('No such document!')
                }
            }
            catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    })
    */

    console.log(requestData)
    console.log(mealData)
    console.log(hostData)

    const getDateString = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    }

    const showStatus = (status) => {
        if (status === 'Accepted') {
            return <CheckIcon />
        } else if (status === 'Rejected') {
            return <CloseIcon />
        } else {
            return <AccessTimeIcon />
        }
    }

    const innerContent = !requestData ? (
        <p>Loading...</p>
    ) : (
        //This is the ui for the requests
        <>
            {requestData.map(function (request, index) {
                ;<li key={request.MealId}>
                    <CardHeader title={mealData[index].name} />

                    <CardContent>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '0.1fr 1fr',
                            }}
                        >
                            <AccountCircleIcon />
                            <span>
                                {hostData[index] && hostData[index].name}
                            </span>
                            <CalendarIcon />
                            <span>
                                {getDateString(
                                    mealData[index] && mealData[index].time
                                        ? new Date(mealData[index].time)
                                        : undefined
                                )}
                            </span>
                            <LocationPinIcon />
                            <span>{mealData[index].location}</span>
                            {/*
                        <ExpirationIcon />
                        <span>Expires {getDateString(expiration)}</span>
                        */}
                            {showStatus(request.Status)}
                            <span>{request.Status}</span>
                        </div>
                    </CardContent>
                </li>
            })}
        </>
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
}
