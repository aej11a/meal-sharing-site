import React from 'react'
import { MealListItem } from '../components/MealListItem'
import { Filters } from '../components/Filters'
import Map from '../components/Map'
import { useMeals } from '../App'

export const Home = () => {
    const { meals } = useMeals()

    return (
        <div>
            <Map meals={meals} />
            <Filters />
            <br />
            {meals &&
                meals.map((meal) => (
                    <MealListItem meal={meal} key={meal.name} />
                ))}
        </div>
    )
}
