import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useUser } from '../App'
import { useViewport } from '../util/use-viewport'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LocationPinIcon from '@material-ui/icons/LocationOn'
import CalendarIcon from '@material-ui/icons/Today'
import ExpirationIcon from '@material-ui/icons/TimerOff'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import { makeStyles } from '@material-ui/core/styles'
//Styles
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
}))

export const MyMeals = () => {
    const classes = useStyles()
    const { isMobile } = useViewport()
    const { user } = useUser()
    const [myMeals, setMyMeals] = useState([])
    const [incomingRequests, setIncomingRequests] = useState([])
    const [users, setUsers] = useState([])

    const showStatus = (status) => {
        if (status === 'Accepted') {
            return <CheckIcon />
        } else if (status === 'Rejected') {
            return <CloseIcon />
        } else {
            return <AccessTimeIcon />
        }
    }

    const chooseStatus = (status, requestId) => {
        if (status === 'Pending') {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={async () => {
                            db.collection('meal-requests')
                                .doc(requestId)
                                .update({ Status: 'Accepted' })
                        }}
                    >
                        Accept Request
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={async () => {
                            db.collection('meal-requests')
                                .doc(requestId)
                                .update({ Status: 'Rejected' })
                        }}
                    >
                        Reject Request
                    </Button>
                </div>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const myMealsArray = []
                    const reqsToMyMeals = []
                    const requestingUsers = []

                    const mealsRes = db
                        .collection('meals')
                        .where('hostId', '==', user.uid)
                    const querySnapshot = await mealsRes.get()

                    if (!querySnapshot.empty) {
                        // Get all requests that match the uid
                        querySnapshot.forEach((doc) => {
                            const oneOfMyMeals = doc.data()
                            myMealsArray.push({ ...oneOfMyMeals, id: doc.id })
                        })
                        setMyMeals(myMealsArray)

                        const mealRequestsRes = db
                            .collection('meal-requests')
                            .where(
                                'MealId',
                                'in',
                                myMealsArray.map((meal) => meal.id).slice(0, 9)
                            )
                        const mealReqsSnapshot = await mealRequestsRes.get()

                        if (!mealReqsSnapshot.empty) {
                            const userIdSet = new Set()

                            mealReqsSnapshot.forEach((doc) => {
                                const aRequestToMyMeal = doc.data()
                                reqsToMyMeals.push({
                                    ...aRequestToMyMeal,
                                    id: doc.id,
                                })
                                userIdSet.add(aRequestToMyMeal.InviteeId)
                            })
                            setIncomingRequests(reqsToMyMeals)

                            const userInfoRes = db
                                .collection('users')
                                .where(
                                    'uid',
                                    'in',
                                    Array.from(userIdSet).slice(0, 9)
                                )

                            const userInfoSnapshot = await userInfoRes.get()
                            if (!userInfoSnapshot.empty) {
                                userInfoSnapshot.forEach((userDoc) => {
                                    requestingUsers.push(userDoc.data())
                                })

                                setUsers(requestingUsers)
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [user])

    const innerContent =
        myMeals && incomingRequests && users.length > 0 ? (
            <div>
                {myMeals.map((meal) => {
                    const mealDate =
                        meal && meal.time ? new Date(meal.time) : undefined
                    const expiration =
                        meal && meal.expire ? new Date(meal.expire) : undefined
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
                    return (
                        <div>
                            <Card className={classes.root}>
                                <h2>{meal.name}</h2>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '0.1fr 1fr',
                                    }}
                                >
                                    <AccountCircleIcon />
                                    <span>You are hosting this meal</span>
                                    <CalendarIcon />
                                    <span>{getDateString(mealDate)}</span>
                                    <LocationPinIcon />
                                    <span>{meal.location}</span>
                                    <ExpirationIcon />
                                    <span>
                                        Expires {getDateString(expiration)}
                                    </span>
                                </div>
                                <div>
                                    {incomingRequests
                                        .filter(
                                            (request) =>
                                                request.MealId === meal.id
                                        )
                                        .map((request) => {
                                            console.log(request.InviteeId)
                                            console.log({ users })
                                            const requestInvitee = users.filter(
                                                (invitee) =>
                                                    invitee.uid ===
                                                    request.InviteeId
                                            )[0]
                                            return (
                                                <li
                                                    key={request.InviteeId}
                                                    style={{
                                                        listStyleType: 'none',
                                                        padding: 10,
                                                    }}
                                                >
                                                    <Card>
                                                        <CardHeader
                                                            title={
                                                                requestInvitee.name
                                                            }
                                                        />

                                                        <CardContent>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'grid',
                                                                    gridTemplateColumns:
                                                                        '0.1fr 1fr',
                                                                }}
                                                            >
                                                                {showStatus(
                                                                    request.Status
                                                                )}
                                                                <span>
                                                                    {
                                                                        request.Status
                                                                    }
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                        {chooseStatus(
                                                            request.Status,
                                                            request.id
                                                        )}
                                                    </Card>
                                                </li>
                                            )
                                        })}
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        ) : (
            <div>Loading...</div>
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
