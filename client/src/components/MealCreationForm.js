import React, { useState } from 'react'
import firebase from 'firebase'
import { storage } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MTextField from '@material-ui/core/TextField'
import MSelect from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { db } from '../firebase'
import { getCoordinates } from '../forward-geocoding'
import { useUser } from '../App'
import Typography from '@material-ui/core/Typography'

require('firebase/storage')
require('firebase/firestore')

const Select = (props) => (
    <MSelect
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)
const TextField = (props) => (
    <MTextField
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)

//styling for dish display card
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '10',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
    },

    regularCard: {
        marginBottom: '10px',
    },
}))

export const DishDisplay = ({ dish, removeDish }) => {
    const classes = useStyles()
    return (
        <Card className={classes.regularCard}>
            <div className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {dish.dishName}
                        </Typography>
                        <Typography component="p" variant="p">
                            {dish.dishCourse}
                        </Typography>

                        <Typography component="p" variant="p">
                            {dish.dishIngredients}
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={dish.dishUrl}
                    title="dish-image"
                />
            </div>
            <div className={classes.controls}>
                {removeDish && (
                    <CardActions>
                        <Button size="small" onClick={removeDish}>
                            Remove
                        </Button>
                    </CardActions>
                )}
            </div>
        </Card>
    )
}

//form component
export const MealCreationForm = () => {
    const [isShowDishes, setShowDishes] = useState(false)
    const [dishes, setDishes] = useState([])
    const [course, setCourse] = useState()
    const [message, setMessage] = useState()
    const [dishName, setDishName] = useState()
    const [dishIngredients, setDishIngredients] = useState()
    const [dishImage, setDishImage] = useState(null)
    const [dishUrl, setDishUrl] = useState('')
    const { user } = useUser()

    //getting image info + url

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setDishImage(e.target.files[0])
        }
        console.log('image received')
    }

    const handleUpload = () => {
        const uploadTask = storage
            .ref(`images/${dishImage.name}`)
            .put(dishImage)
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref('images')
                    .child(dishImage.name)
                    .getDownloadURL()
                    .then((url) => {
                        setDishUrl(url)
                    })
            }
        )
    }

    const addDish = () => {
        setDishes([
            ...dishes,
            {
                dishName,
                dishIngredients,
                dishCourse: course,
                dishUrl, //dish image url
            },
        ])
        setCourse(null)
        setDishName(null)
        setDishIngredients(null)
        setShowDishes(false)
        setDishUrl(null)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        document.getElementById('create-form').style.display = 'none'
        document.getElementById('loading').style.display = 'block'

        const coordinates = await getCoordinates(event.target.location.value)

        // Don't use .doc(), so that firebase will make an ID for us
        db.collection('meals')
            .add({
                hostId: user.uid,
                name: event.target.mealname.value,
                dishes: dishes.map((dish) => {
                    dish.dishIngredients = dish.dishIngredients
                        .toLowerCase()
                        .replace(' ', '')
                    return dish
                }),
                time: event.target.time.value,
                location: event.target.location.value,
                maxGuests: event.target.numguests.value,
                fee: event.target.fee.value,
                expire: event.target.expiration.value,
                ...coordinates,
            })
            .then((docRef) => {
                console.log('Doc written with ID: ', docRef.id)
                db.collection('users')
                    .doc(user.uid)
                    .update({
                        hostingMealIds: firebase.firestore.FieldValue.arrayUnion(
                            docRef.id
                        ),
                    })
                    .then(() => {
                        document.getElementById('create-form').style.display =
                            'block'
                        document.getElementById('loading').style.display =
                            'none'
                        event.target.reset()
                        setDishes([])
                        setMessage(
                            `<div style="color: #4a824b; border: 1px solid #4a824b; padding: 3px;">Your meal has been posted! <a href="/meals/display/${docRef.id}">View it here.</a></div>`
                        )
                    })
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
                document.getElementById('create-form').style.display = 'block'
                document.getElementById('loading').style.display = 'none'
            })
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Card
                    style={{ padding: 50, minWidth: '25vw' }}
                    id="create-form"
                >
                    <div style={{ display: isShowDishes ? 'none' : 'block' }}>
                        {typeof message === 'string' && (
                            <div
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        )}
                        <h1>Create your Meal</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="outlined-basic"
                                label="Meal Name"
                                name="mealname"
                                variant="outlined"
                            />
                            <TextField
                                id="datetime-local"
                                label="Meal Time"
                                type="datetime-local"
                                name="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Location"
                                name="location"
                                variant="outlined"
                            />
                            <h6>Dishes</h6>
                            {dishes.map((dish, idx) => (
                                <DishDisplay
                                    dish={dish}
                                    removeDish={() =>
                                        setDishes(
                                            dishes.filter(
                                                (dish, testIdx) =>
                                                    testIdx !== idx
                                            )
                                        )
                                    }
                                />
                            ))}
                            <Button
                                onClick={() => setShowDishes(true)}
                                variant="contained"
                            >
                                Add Dish
                            </Button>
                            <br />
                            <br />
                            <TextField
                                id="guests-number"
                                label="Number of Guests"
                                type="number"
                                name="numguests"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-basic"
                                label="Fee in $/Person"
                                type="number"
                                name="fee"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="datetime-local"
                                label="Invite Expiration"
                                type="datetime-local"
                                name="expiration"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>

                    <div style={{ display: isShowDishes ? 'block' : 'none' }}>
                        <h1>Add Dishes</h1>
                        <div>
                            <InputLabel id="course-label">Course</InputLabel>
                            <Select
                                labelId="course-label"
                                id="course-select"
                                autoComplete="off"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <MenuItem value={'appetizer'}>
                                    Appetizer
                                </MenuItem>
                                <MenuItem value={'entree'}>Entree</MenuItem>
                                <MenuItem value={'dessert'}>Dessert</MenuItem>
                            </Select>
                            <TextField
                                id="dish-name"
                                label="Dish Name"
                                variant="outlined"
                                autoComplete="off"
                                onChange={(e) => setDishName(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Dish Ingredients (comma separated)"
                                variant="outlined"
                                autoComplete="off"
                                onChange={(e) =>
                                    setDishIngredients(e.target.value)
                                }
                            />
                            <br></br>

                            <div>
                                {/**gets user uploaded file */}
                                <input type="file" onChange={handleChange} />
                                <br></br>
                                <br></br>

                                <div>
                                    {' '}
                                    {/**sends the uploaded file to the database and produces a firebase URL*/}
                                    <Button
                                        onClick={handleUpload}
                                        variant="contained"
                                    >
                                        Upload Image
                                    </Button>
                                </div>
                                <div></div>
                            </div>

                            <br />
                            <Button onClick={addDish} variant={'contained'}>
                                Add Dish
                            </Button>
                        </div>
                    </div>
                </Card>
                <p id="loading" style={{ display: 'none' }}>
                    Loading...
                </p>
            </Grid>
        </Grid>
    )
}
