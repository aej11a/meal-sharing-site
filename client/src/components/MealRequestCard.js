import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { db } from '../firebase'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { makeStyles } from '@material-ui/core/styles'
import { useViewport } from '../use-viewport'
import { useUser } from '../App'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
}))

export default function MealRequestCard(props) {
    const { isMobile } = useViewport()
    const classes = useStyles()
    const { user } = useUser()
    const [requestData, setRequestData] = useState()
    const [inviteeData, setInviteeData] = useState()

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
                        .where('MealId', '==', props.uid)
                    const querySnapshot = await requestRes.get()

                    if (!querySnapshot.empty) {
                        // Get all requests that match the uid
                        querySnapshot.forEach((doc) => {
                            requestArray.push({
                                data: doc.data(),
                                id: doc.RequestId,
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
                                    .doc(doc.data.InviteeId)
                                    .get()
                                if (inviteeRes.exists) {
                                    return {
                                        ...inviteeRes.data(),
                                        id: doc.data.InviteeId,
                                    }
                                } else {
                                    console.log('No such document!')
                                }
                            })
                            const results = await Promise.all(queries)
                            setInviteeData(results)
                        }
                    } else {
                        console.log('No such document!')
                    }
                }
            } catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    }, [user])

    const showStatus = (status) => {
        if (status === 'Accepted') {
            return <CheckIcon />
        } else if (status === 'Rejected') {
            return <CloseIcon />
        } else {
            return <AccessTimeIcon />
        }
    }

    const chooseStatus = (status) => {
        if (status === 'Accepted' || status === 'Rejected') {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ float: 'left' }}
                        onClick={async () => {
                            db.collection('meal-requests')
                                .doc(requestData.id)
                                .update({ Status: 'Accepted' })
                        }}
                    >
                        Accept Request
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ float: 'right' }}
                        onClick={async () => {
                            db.collection('meal-requests')
                                .doc(requestData.id)
                                .update({ Status: 'Rejected' })
                        }}
                    >
                        Reject Request
                    </Button>
                </>
            )
        }
    }
    console.log({
        requestData,
        inviteeData,
        condition: !(requestData && inviteeData),
    })
    const innerContent = !(requestData && inviteeData) ? (
        <p>Loading...</p>
    ) : (
        //This is the ui for the requests
        <>
            {requestData.map(function (request, index) {
                const requestInvitee = inviteeData.filter(
                    (invitee) => invitee.id === request.data.InviteeId
                )[0]
                return (
                    <li
                        key={request.data.InviteeId}
                        style={{ listStyleType: 'none' }}
                    >
                        <AccountCircleIcon />
                        <CardHeader title={requestInvitee.name} />

                        <CardContent>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '0.1fr 1fr',
                                }}
                            >
                                {showStatus(request.data.Status)}
                                <span>{request.data.Status}</span>
                                {chooseStatus(request.data.Status)}
                            </div>
                        </CardContent>
                    </li>
                )
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
