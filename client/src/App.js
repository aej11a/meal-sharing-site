import React, { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { AccountPage } from './pages/Account/AccountPage'
import './App.css'
import { NavBar } from './components/NavBar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import { MealCreation } from './pages/MealCreation'
import { MealDisplay } from './pages/MealDisplay'
import { firebase, db } from './firebase'

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

const UserStore = createContext()
export const useUser = () => useContext(UserStore)
const UserProvider = ({ children }) => {
    const [user, setUser] = useState()

    const auth = firebase.auth()
    auth.onAuthStateChanged((authUser) => {
        if (!user) {
            db.collection('users')
                .doc(authUser.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const user = doc.data()
                        setUser(user)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!')
                    }
                })
        }
    })
    const logout = () => {
        auth.signOut()
        setUser(null)
    }
    return (
        <UserStore.Provider value={{ user, setUser, auth, logout }}>
            {children}
        </UserStore.Provider>
    )
}

const MealStore = createContext()
export const useMeals = () => useContext(MealStore)
const MealProvider = ({ children }) => {
    const [meals, setMeals] = useState()
    const getMeals = async (allergens) => {
        const snapshot = await db.collection('meals').get()
        const rawMealsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        if (allergens && allergens.length) {
            setMeals(
                rawMealsData.filter((meal) => {
                    let isMealSafe = true

                    allergens.forEach((allergen) => {
                        meal.dishes.forEach((dish) => {
                            if (dish.dishIngredients.includes(allergen))
                                isMealSafe = false
                        })
                    })

                    return isMealSafe
                })
            )
        } else {
            setMeals(rawMealsData)
        }
    }

    useEffect(() => getMeals(), [])

    return (
        <MealStore.Provider value={{ meals, getMeals }}>
            {children}
        </MealStore.Provider>
    )
}

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <MealProvider>
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
                            <Route exact path="/meals/new">
                                <MealCreation />
                            </Route>
                            <Route exact path="/meals/display/:mealId">
                                <MealDisplay />
                            </Route>
                        </Switch>
                    </Router>
                </MealProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App
