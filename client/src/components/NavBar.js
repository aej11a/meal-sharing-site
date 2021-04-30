import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { useUser } from '../App'
import { Link as RouterLink } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AddBoxIcon from '@material-ui/icons/AddBox'

function ListItemLink(props) {
    const { icon, primary, to } = props

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    )

    return (
        <ListItem button component={renderLink} style={{ width: 'unset' }}>
            {icon ? (
                <ListItemIcon style={{ color: '#2F4858', minWidth: 36 }}>
                    {icon}
                </ListItemIcon>
            ) : null}
            <ListItemText primary={primary} />
        </ListItem>
    )
}

export const NavBar = () => {
    const { user } = useUser()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ marginRight: 20 }}>
                    <RouterLink
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: '#2F4858',
                            fontWeight: 700,
                        }}
                    >
                        cookout!
                    </RouterLink>
                </Typography>
                <ListItemLink
                    to="/account"
                    primary="Account"
                    icon={<AccountBoxIcon />}
                />
                {user && (
                    <ListItemLink
                        to="/meals/new"
                        primary="Create Meal"
                        icon={<AddBoxIcon />}
                    />
                )}
                {user && (
                    <ListItemLink
                        to="/requests"
                        primary="My Requests"
                        icon={<AddBoxIcon />} //Look up Icons
                    />
                )}
            </Toolbar>
        </AppBar>
    )
}
