import React, { useEffect } from 'react'
import { db } from '../firebase'
import { MealListItem } from '../components/MealListItem'
import { Filters } from '../components/Filters'
import { Map } from '../components/Map'

const getMeals = async (allergens) => {
    const snapshot = await db.collection('meals').get()
    const rawMealsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }))
    if (allergens && allergens.length) {
        return rawMealsData.filter((meal) => {
            let isMealSafe = true

            allergens.forEach((allergen) => {
                meal.dishes.forEach((dish) => {
                    if (dish.dishIngredients.includes(allergen))
                        isMealSafe = false
                })
            })

            return isMealSafe
        })
    } else {
        return rawMealsData
    }
}

export const Home = () => {
    const [meals, setMeals] = React.useState()
    const [appliedFilters, setAppliedFilters] = React.useState([])

    useEffect(() => {
        getMeals(appliedFilters).then(setMeals)
    }, [appliedFilters])

    return (
        <div>
            <Map />
            <Filters
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
            />
            <br />
            {meals &&
                meals.map((meal) => (
                    <MealListItem meal={meal} key={meal.name} />
                ))}
        </div>
    )
}
