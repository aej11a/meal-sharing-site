//imports
import React, { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'
import MealRequestCard from '../components/MealRequestCard'
import { db } from '../firebase'
import { useParams } from 'react-router'

//Functional Component
export const MealDisplay = () => {
    const [mealData, setMealData] = useState()
    const [hostData, setHostData] = useState()
    const { mealId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            /*
                Functionality for get data from firestore
                */
            try {
                const mealRes = await db.collection('meals').doc(mealId).get()
                if (mealRes.exists) {
                    setMealData(mealRes.data())
                    if (mealRes.data().hostId) {
                        const userRes = await db
                            .collection('users')
                            .doc(mealRes.data().hostId)
                            .get()
                        if (userRes.exists) {
                            setHostData(userRes.data())
                        } else {
                            console.log('No such document!')
                        }
                    }
                } else {
                    console.log('No such document!')
                }
            } catch (error) {
                console.log('Error getting document:', error)
            }
        }
        fetchData()
    }, [mealId])

    return mealData && hostData ? (
        <div>
            <MealCard mealData={mealData} hostData={hostData} mealId={mealId} />
            <MealRequestCard mealData={mealData} mealId={mealId} />
        </div>
    ) : (
        <p>Loading...</p>
    )
}

export default MealDisplay
