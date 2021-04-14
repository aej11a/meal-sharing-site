import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
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
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
    },
    inside: {
        width: 345,
        spacing: 8,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}))

export default function CenteredGrid() {
    const classes = useStyles()
    const [expanded] = React.useState(false)

    return (
        <div className={classes.root}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <h1>Listings in Hoboken, NJ</h1>
                    <img
                        src="https://www.google.com/maps/d/thumbnail?mid=1dxxbpzofuaaHNIosNd_blyjCjuw&hl=en"
                        alt="Logo"
                        style={{
                            width: 400,
                            height: 400,
                            position: 'relative',
                            top: 30,
                            left: 20,
                            bottom: 30,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.inside}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                >
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Taco Tuesday"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image="https://thesaltymarshmallow.com/wp-content/uploads/2020/05/beef-tacos1.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Bring your best guac!
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or
                                    a large, deep skillet over medium-high heat.
                                    Add chicken, shrimp and chorizo, and cook,
                                    stirring occasionally until lightly browned,
                                    6 to 8 minutes. Transfer shrimp to a large
                                    plate and set aside, leaving chicken and
                                    chorizo in the pan. Add pimentón, bay
                                    leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until
                                    thickened and fragrant, about 10 minutes.
                                    Add saffron broth and remaining 4 1/2 cups
                                    chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute.
                                    Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice,
                                    and cook again without stirring, until
                                    mussels have opened and rice is just tender,
                                    5 to 7 minutes more. (Discard any mussels
                                    that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10
                                    minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card className={classes.inside}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                >
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Filipino Kamayan"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image="https://www.goodnewspilipinas.com/wp-content/uploads/2019/06/61440912_1379597732193434_1611366570633984075_n.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Boodle Boodle style. Get ready to use your hands
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or
                                    a large, deep skillet over medium-high heat.
                                    Add chicken, shrimp and chorizo, and cook,
                                    stirring occasionally until lightly browned,
                                    6 to 8 minutes. Transfer shrimp to a large
                                    plate and set aside, leaving chicken and
                                    chorizo in the pan. Add pimentón, bay
                                    leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until
                                    thickened and fragrant, about 10 minutes.
                                    Add saffron broth and remaining 4 1/2 cups
                                    chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute.
                                    Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice,
                                    and cook again without stirring, until
                                    mussels have opened and rice is just tender,
                                    5 to 7 minutes more. (Discard any mussels
                                    that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10
                                    minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.inside}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                >
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Italian Night"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image="data:image/jpeg;base64,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"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Mamma Mia. This dinner will take you back to
                                Italy.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or
                                    a large, deep skillet over medium-high heat.
                                    Add chicken, shrimp and chorizo, and cook,
                                    stirring occasionally until lightly browned,
                                    6 to 8 minutes. Transfer shrimp to a large
                                    plate and set aside, leaving chicken and
                                    chorizo in the pan. Add pimentón, bay
                                    leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until
                                    thickened and fragrant, about 10 minutes.
                                    Add saffron broth and remaining 4 1/2 cups
                                    chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute.
                                    Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice,
                                    and cook again without stirring, until
                                    mussels have opened and rice is just tender,
                                    5 to 7 minutes more. (Discard any mussels
                                    that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10
                                    minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
