import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { db } from '../firebase'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { makeStyles } from '@material-ui/core/styles'
import { useViewport } from '../util/use-viewport'
import { useUser } from '../App'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
    button: {
        margin: '.5rem',
        position: 'relative',
    },
}))

export default function MealRequestCard({ mealData, mealId }) {
    const { isMobile } = useViewport()
    const classes = useStyles()
    const { user } = useUser()
    const [requestData, setRequestData] = useState()
    const [inviteeData, setInviteeData] = useState()
    const [docNotFound, setDocNotFound] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                if (user) {
                    let requestArray = []
                    const requestRes = db
                        .collection('meal-requests')
                        .where('MealId', '==', mealId)
                    const querySnapshot = await requestRes.get()

                    if (!querySnapshot.empty) {
                        // Get all requests that match the uid
                        querySnapshot.forEach((doc) => {
                            requestArray.push({
                                ...doc.data(),
                                id: doc.id,
                            })
                        })
                        setRequestData(requestArray)

                        // If requests are found, get all of the meal info and user data for the request meals
                        if (requestArray.length > 0) {
                            // map means "for each (X) in array, (do something to X) to (make corresponding element Y in the new array)"
                            // so here it means "for each (element in requestArray), (run a query) and (put the promise in the queries array)"
                            const queries = requestArray.map(async (doc) => {
                                const inviteeRes = await db
                                    .collection('users')
                                    .doc(doc.InviteeId)
                                    .get()
                                if (inviteeRes.exists) {
                                    return {
                                        ...inviteeRes.data(),
                                        id: doc.InviteeId,
                                    }
                                } else {
                                    console.log('No such document!')
                                    setDocNotFound(true)
                                }
                            })
                            const results = await Promise.all(queries)
                            setInviteeData(results)
                        }
                    } else {
                        console.log('No such document!')
                        setDocNotFound(true)
                    }
                }
            } catch (error) {
                console.log('Error getting document:', error)
                setDocNotFound(true)
            }
        }
        fetchData()
    }, [user, mealId])

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

    const innerContent = !(requestData && inviteeData) ? (
        <p>Loading...</p>
    ) : (
        //This is the ui for the requests
        <>
            {requestData.map(function (request) {
                const requestInvitee = inviteeData.filter(
                    (invitee) => invitee.id === request.InviteeId
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
                            <CardHeader title={requestInvitee.name} />

                            <CardContent>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '0.1fr 1fr',
                                    }}
                                >
                                    {showStatus(request.Status)}
                                    <span>{request.Status}</span>
                                </div>
                            </CardContent>
                            {chooseStatus(request.Status, request.id)}
                        </Card>
                    </li>
                )
            })}
        </>
    )

    const mobileDisplay = isMobile ? (
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

    return user && user.uid === mealData.hostId && !docNotFound
        ? mobileDisplay
        : null
}
