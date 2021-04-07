import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './Home'
import { AccountPage } from './Account/AccountPage'
import './App.css'
import { NavBar } from './NavBar/NavBar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: orange[100],
            main: orange[500],
            dark: orange[700],
            contrastText: '#2F4858',
        },
        secondary: {
            main: '#2F4858',
        },
    },
})

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavBar />
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/account">
                        <AccountPage />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}
