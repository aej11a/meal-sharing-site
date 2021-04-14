import React, { useEffect } from 'react'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
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
    


    useEffect(() => {
        /*
            Functionality for get data from firestore
            Note: the .doc() has a static value for testing purposes.
                We should replace that with a dynamic value at some point,
            */
        try {
            const docRef = await db.collection('meals').doc('aEpQG38Kws4GsCwikhhH').get();
            if (docRef.exists) {
                const data = docRef.data()
            } else {
                console.log('No such document!')
            }
        } catch (error) {
            console.log('Error getting document:', error)
        }
    }, [mealId])

return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image="https://miro.medium.com/max/1226/1*zGmA-8Fi6gZt7-je1_MOLQ.png"
                title="Paella dish"
            />
            <CardHeader title="Italian Night" />

            <CardContent>
                <Typography title>Date:</Typography>
                <Typography title>Host:</Typography>
                <Typography title>Location:</Typography>
                <Typography title>Distance:</Typography>
                <Button variant="contained" color="primary">
                    Join Meal
                </Button>
                <Typography variant="body2" color="textSecondary" component="p">
                    This dinner will have you so hungry!
                </Typography>
            </CardContent>

            <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>Appetizer</Typography>
                <Typography paragraph>Main Entree</Typography>
                <Typography>Dessert</Typography>
            </CardContent>
        </Card>
    )
}
