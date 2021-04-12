import logo from './logo.svg'
import './App.css'
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {db} from "./firebase"

function App() {
    //form component
    class MealCreationForm extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                mealType: ' ',
                mealName: ' ',
                mealIngredients: ' ',
                mealTime: ' ',
                mealLocation: ' ',
                mealGuestsNum: ' ',
                mealGuestFee: ' ',
                mealExpiration: ' '
            }

            this.handleChange = this.handleInputChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        handleInputChange(event) {
            this.setState({value: event.target.value});
        }

        handleSubmit(event) {
            event.preventDefault();
            console.log(this.state);

            db.collection('meals').doc(this.state.mealType).add({
                type: this.state.mealType,
                name: this.state.mealName,
                ingredients: this.state.mealIngredients,
                time: this.state.mealTime,
                location: this.state.mealLocation,
                guests: this.state.mealGuestsNum,
                fee: this.state.mealGuestFee,
                expire: this.state.mealExpiration
            })
            .then((docRef) => {
            console.log("Doc written with ID: ", docRef.id)
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }

        render() {
            return (
                <Card>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label for="nameImput">Type of Meal</label>
                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                    />

                                    {/** 
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="nameImput"
                                    placeholder="ex: Mexican"
                                 /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="emailImput">Name of Meal</label>
                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                    />

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="emailInput">Ingredients</label>
                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                    />

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="timeInput">Time</label>
                                <div>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={this.state.mealTime}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={100}>1:00 PM</MenuItem>
                                        <MenuItem value={200}>2:00 PM</MenuItem>
                                        <MenuItem value={300}>3:00 PM</MenuItem>
                                        <MenuItem value={400}>4:00 PM</MenuItem>
                                        <MenuItem value={400}>5:00 PM</MenuItem>
                                    </Select>

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="emailImput">Location</label>
                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                    />

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                                */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="numberOfGuests">
                                    Number of Guests
                                </label>
                                <div>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={this.state.mealGuestsNum}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />

                                */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="fee">Fee/Person</label>
                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                    />

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="emailImput">
                                    Invitation expires in:
                                </label>
                                <div>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={this.state.mealExpiration}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1 Day</MenuItem>
                                        <MenuItem value={2}>2 Days</MenuItem>
                                        <MenuItem value={3}>3 Days</MenuItem>
                                        <MenuItem value={4}>4 Days</MenuItem>
                                        <MenuItem value={5}>5 Days</MenuItem>
                                    </Select>

                                    {/** 
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                /> **/}
                                </div>
                            </div>
                            <Button variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </div>
                </Card>
            )
        }
    }

    class MainTitle extends React.Component {
        render() {
            return <h1>Create Your Meal</h1>
        }
    }

    return (
        <div className="App">
            <div>
                <MainTitle />
                <MealCreationForm />
            </div>
        </div>
    )
}

export default App
