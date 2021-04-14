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
import HomeIcon from '@material-ui/icons/Home'
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
                <Typography
                    variant="h6"
                    style={{ marginRight: 50, flexGrow: 1 }}
                >
                    Meal Sharing App
                </Typography>
                <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                <ListItemLink
                    to="/account"
                    primary="Account"
                    icon={<AccountBoxIcon />}
                />
                {user && (
                    <>
                        <ListItemLink
                            to="/meals/new"
                            primary="Create Meal"
                            icon={<AddBoxIcon />}
                        />
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
