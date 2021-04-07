import logo from './logo.svg'
import './App.css'
import React from 'react'

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
                mealExpiration: ' ',
            }

            this.handleChange = this.handleInputChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        handleInputChange(event) {
            const target = event.target
            const value =
                target.type === 'checkbox?' ? target.checked : target.value
            const name = target.name

            this.setState({
                [name]: value,
            })
            console.log('Change detected. State Updated' + name + '=' + value)
        }

        handleSubmit(event) {
            alert(
                'A form was submitted: ' +
                    this.state.name +
                    ' //' +
                    this.state.email
            )
            event.preventDefault()
        }

        render() {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="nameImput">Type of Meal</label>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="nameImput"
                                    placeholder="ex: Mexican"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Name of Meal</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Ingredients</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Time</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Location</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Number of Guests</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">Fee/Person</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="emailImput">
                                Invitation expires in:
                            </label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="emailImput"
                                    placeholder="ex: Joan's Taco Tuesday"
                                />
                            </div>
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                        />
                    </form>
                </div>
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
