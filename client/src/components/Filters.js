import React from 'react'
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

export const Filters = ({ appliedFilters, setAppliedFilters }) => {
    const [showFilterMenu, setShowFilterMenu] = React.useState()

    return (
        <div className="filters">
            <Fab
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                style={{
                    backgroundColor: '#ff9800',
                    color: '#2F4858',
                    position: 'fixed',
                    top: 65,
                    right: 25,
                    zIndex: 9999,
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
