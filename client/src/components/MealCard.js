import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router'
import { DishDisplay } from './MealCreationForm'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LocationPinIcon from '@material-ui/icons/LocationOn'
import CalendarIcon from '@material-ui/icons/Today'
import DistanceIcon from '@material-ui/icons/SpaceBar'
import ExpirationIcon from '@material-ui/icons/TimerOff'
import { useViewport } from '../use-viewport'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        width: 500,
        flexGrow: 1,
        marginTop: 15,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}))

export default function MealCard() {
    const classes = useStyles()
    const [mealData, setMealData] = useState()
    const { mealId } = useParams()
    const [hostData, setHostData] = useState()
    const { isMobile } = useViewport()

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                const mealRes = await db.collection('meals').doc(mealId).get()
                if (mealRes.exists) {
                    setMealData(mealRes.data())
                    if (mealRes.data().hostId) {
                        const userRes = await db
                            .collection('users')
                            .doc(mealRes.data().hostId)
                            .get()
                        if (userRes.exists) {
                            setHostData(userRes.data())
                        } else {
                            console.log('No such document!')
                        }
                    }
                } else {
                    console.log('No such document!')
                }
            } catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    }, [mealId])

    const mealDate =
        mealData && mealData.time ? new Date(mealData.time) : undefined
    const expiration =
        mealData && mealData.expire ? new Date(mealData.expire) : undefined
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

    const innerContent = !mealData ? (
        <p>Loading...</p>
    ) : (
        <>
            <CardMedia
                className={classes.media}
                image="https://miro.medium.com/max/1226/1*zGmA-8Fi6gZt7-je1_MOLQ.png"
                title="Paella dish"
            />
            <CardHeader title={mealData.name} />
            <CardContent>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '0.1fr 1fr',
                    }}
                >
                    <AccountCircleIcon />
                    <span>{hostData && hostData.name}</span>
                    <CalendarIcon />
                    <span>{getDateString(mealDate)}</span>
                    <LocationPinIcon />
                    <span>{mealData.location}</span>
                    <DistanceIcon />
                    <span>DISTANCE TODO</span>
                    <ExpirationIcon />
                    <span>Expires {getDateString(expiration)}</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: 'right' }}
                >
                    Join Meal
                </Button>
            </CardContent>

            <CardContent>
                <h3>Dishes</h3>
                {mealData.dishes.map((dish) => (
                    <DishDisplay dish={dish} />
                ))}
            </CardContent>
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
