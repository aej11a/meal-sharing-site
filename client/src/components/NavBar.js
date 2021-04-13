import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Link,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link as RouterLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { firebase } from '../firebase'

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
    const [user, loading, error] = useAuthState(firebase.auth())

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
            </Toolbar>
        </AppBar>
    )
}
