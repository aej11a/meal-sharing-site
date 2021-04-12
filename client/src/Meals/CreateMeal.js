import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import MTextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { db } from '../firebase'
import { getCoordinates } from '../forward-geocoding'

const TextField = (props) => (
    <MTextField
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)

//form component
export const MealCreationForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault()

        const coordinates = await getCoordinates(event.target.location.value)

        // Don't use .doc(), so that firebase will make an ID for us
        db.collection('meals')
            .add({
                name: event.target.mealname.value,
                ingredients: event.target.ingredients.value
                    .toLowerCase()
                    .replaceAll(' ', '')
                    .split(','),
                time: event.target.time.value,
                location: event.target.location.value,
                maxGuests: event.target.numguests.value,
                fee: event.target.fee.value,
                expire: event.target.expiration.value,
                ...coordinates,
            })
            .then((docRef) => {
                console.log('Doc written with ID: ', docRef.id)
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
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
                <Card style={{ padding: 50, minWidth: '25vw' }}>
                    <h1>Host a Meal</h1>
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
                            inputProps={{
                                step: 900, // 15 min
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Location"
                            name="location"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Ingredients, comma-separated"
                            name="ingredients"
                            variant="outlined"
                        />
                        <TextField
                            id="guests-number"
                            label="Number of Guests"
                            type="number"
                            name="numguests"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Fee in $/Person"
                            name="fee"
                            variant="outlined"
                        />
                        <TextField
                            id="datetime-local"
                            label="Invite Expiration"
                            type="datetime-local"
                            name="expiration"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 900, // 15 min
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
                </Card>
            </Grid>
        </Grid>
    )
}

class MainTitle extends React.Component {
    render() {
        return <h1>Create Your Meal</h1>
    }
}
