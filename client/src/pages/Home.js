import React, { useEffect } from 'react'
import { db } from '../firebase'
import { MealListItem } from '../components/MealListItem'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import MTextField from '@material-ui/core/TextField'
const TextField = (props) => (
    <MTextField
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)
const getMeals = async (allergens) => {
    const snapshot = await db.collection('meals').get()
    const rawMealsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }))
    if (allergens && allergens.length) {
        return rawMealsData.filter((meal) => {
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
        return rawMealsData
    }
}

export const Home = () => {
    const [meals, setMeals] = React.useState()
    const [filters, setFilters] = React.useState([])

    useEffect(() => {
        getMeals().then(setMeals)
    }, [filters])

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    const newAllergen = event.target.removeIngredient.value
                    if (newAllergen && newAllergen.length > 0)
                        setFilters([...filters, newAllergen])
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Remove Ingredient"
                    name="removeIngredient"
                    variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">
                    Add Filter
                </Button>
            </form>
            {filters &&
                filters.map((filter) => (
                    <Chip label={filter} variant="outlined"></Chip>
                ))}
            {meals &&
                meals.map((meal) => (
                    <MealListItem meal={meal} key={meal.name} />
                ))}
        </div>
    )
}
