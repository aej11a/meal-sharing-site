import React, { useEffect } from 'react'
import { useMeals } from '../App'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import FilterListIcon from '@material-ui/icons/FilterList'
import Chip from '@material-ui/core/Chip'
import MTextField from '@material-ui/core/TextField'
const TextField = (props) => (
    <MTextField
        {...props}
        style={{ ...props.style, display: 'block', marginBottom: 10 }}
    />
)

export const Filters = () => {
    const [showFilterMenu, setShowFilterMenu] = React.useState()
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const { getMeals } = useMeals()

    useEffect(() => {
        getMeals(appliedFilters)
    }, [appliedFilters]) //eslint-disable-line

    return (
        <div className="filters">
            <Fab
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                style={{
                    backgroundColor: '#ff9800',
                    color: '#2F4858',
                    float: 'right',
                    marginTop: 10,
                    marginRight: 10,
                    zIndex: 2,
                }}
            >
                <FilterListIcon />
            </Fab>
            {showFilterMenu && (
                <form
                    id="filters-form"
                    style={{ marginTop: 50, marginLeft: 20 }}
                    onSubmit={(event) => {
                        event.preventDefault()
                        const newAllergen = event.target.removeIngredient.value
                        if (
                            newAllergen &&
                            newAllergen.length > 0 &&
                            !appliedFilters.includes(newAllergen)
                        )
                            setAppliedFilters([...appliedFilters, newAllergen])
                        document.getElementById('filters-form').reset()
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
            )}
            <br />
            {appliedFilters && (
                <>
                    {appliedFilters.length > 0 && (
                        <span style={{ marginLeft: 20, marginRight: 5 }}>
                            Blocking allergens:
                        </span>
                    )}
                    {appliedFilters.map((filter) => (
                        <Chip
                            label={filter}
                            onClick={() =>
                                setAppliedFilters(
                                    appliedFilters.filter(
                                        (filterName) => filterName !== filter
                                    )
                                )
                            }
                            onDelete={() =>
                                setAppliedFilters(
                                    appliedFilters.filter(
                                        (filterName) => filterName !== filter
                                    )
                                )
                            }
                        />
                    ))}
                    <br />
                </>
            )}
        </div>
    )
}
