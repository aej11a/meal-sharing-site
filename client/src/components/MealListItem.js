import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        margin: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    image: {
        width: 151,
    },
}))

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

export const MealListItem = ({ meal }) => {
    const classes = useStyles()

    return (
        <Link
            to={`/meals/display/${meal.id}`}
            style={{ textDecoration: 'none' }}
        >
            <Card className={`${classes.root} meal-list-item-card`}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {meal.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {getDateString(new Date(meal.time))}
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.image}
                    image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636"
                    title="Meal image"
                />
            </Card>
        </Link>
    )
}
