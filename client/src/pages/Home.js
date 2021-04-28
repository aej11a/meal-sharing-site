import React, { useEffect } from 'react'
import { db } from '../firebase'
import Button from '@material-ui/core/Button'
import MTextField from '@material-ui/core/TextField'
const TextField = (props) => (
    <MTextField
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)
const getMeals = async (allergens) => {
    const snapshot = await db.collection('meals').get()
    console.log()
    if (allergens && allergens.length) {
        return snapshot.docs
            .map((doc) => doc.data())
            .filter((meal) => {
                const hasDishes = !!meal.dishes && meal.dishes.length > 0
                if (!allergens) return true
                else {
                    const isEachAllergenInDish = allergens.map((allergen) => {
                        const dishIncludesAllergen = (dish) =>
                            dish.dishIngredients &&
                            dish.dishIngredients.includes(allergen)
                        return (
                            hasDishes &&
                            typeof meal.dishes.find(dishIncludesAllergen) ===
                                'undefined'
                        )
                    })
                    return isEachAllergenInDish.includes(true)
                }
            })
    } else {
        return snapshot.docs.map((doc) => doc.data())
    }
}

export const Home = () => {
    const [meals, setMeals] = React.useState()

    useEffect(() => {
        getMeals().then(setMeals)
    }, [])

    return (
        <div>
            Home
            {JSON.stringify(meals)}
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    const allergens = event.target.removeIngredient.value
                    if (allergens) {
                        getMeals(
                            allergens.toLowerCase().replace(' ', '').split(',')
                        ).then(setMeals)
                    }
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Remove Ingredient"
                    name="removeIngredient"
                    variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}
