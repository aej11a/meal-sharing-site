import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router'
import { DishDisplay } from './MealCreationForm'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
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

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                const docRef = await db.collection('meals').doc(mealId).get()
                if (docRef.exists) {
                    setMealData(docRef.data())
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

    return (
        <Card className={classes.root}>
            {!mealData ? (
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
                        <Typography title>{getDateString(mealDate)}</Typography>
                        <Typography title>Host: TODO</Typography>
                        <Typography title>{mealData.location}</Typography>
                        <Typography title>Distance: TODO</Typography>
                        <Typography title>
                            Expires {getDateString(expiration)}
                        </Typography>
                        <Button variant="contained" color="primary">
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
            )}
        </Card>
    )
}
