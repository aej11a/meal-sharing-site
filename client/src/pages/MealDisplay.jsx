//imports
import React from 'react'
import MealCard from '../components/MealCard'
import MealRequestCard from '../components/MealRequestCard'

//Functional Component
export const MealDisplay = () => {
    return (
        <div>
            <MealCard />
            <MealRequestCard />
        </div>
    )
}

export default MealDisplay
