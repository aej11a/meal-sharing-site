import logo from './logo.svg'
import './App.css'
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
} from 'react-router-dom'

//Pages
import MealDisplay from './pages/MealDisplay' ///< index.jsx will be automatically imported
import MealCreation from './pages/MealCreation'
import Title from './components/Title'

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path="/MealDisplay" component={MealDisplay} />
                <Route exact path="/MealCreation" component={MealCreation} />
            </Router>
        </div>
    )
}

export default App
