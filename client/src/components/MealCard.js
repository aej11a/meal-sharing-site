import React, { Component } from 'react'
import Title from './Title'
import Image from './Image'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import FastfoodIcon from '@material-ui/icons/Fastfood'

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
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

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
