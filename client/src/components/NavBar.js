import React, { useState } from 'react'
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
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useViewport } from '../util/use-viewport'

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
    const [showNavDrawer, setShowNavDrawer] = useState()
    const { user } = useUser()
    const { isMobile } = useViewport()

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
                {!user && (
                    <ListItemLink
                        to="/account"
                        primary="Sign In"
                        icon={<AccountBoxIcon />}
                    />
                )}
                {user && (
                    <>
                        <span onClick={() => setShowNavDrawer(true)}>
                            <MenuIcon
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: isMobile ? 17 : 20,
                                }}
                            />
                        </span>
                        <Drawer
                            anchor={'right'}
                            open={showNavDrawer}
                            onClose={() => setShowNavDrawer(false)}
                        >
                            <ListItemLink
                                to="/account"
                                primary="Account"
                                icon={<AccountBoxIcon />}
                            />
                            <ListItemLink
                                to="/meals/new"
                                primary="Create Meal"
                                icon={<AddBoxIcon />}
                            />
                            <ListItemLink
                                to="/requests"
                                primary="My Requests"
                                icon={<ListAltIcon />} //Look up Icons
                            />
                        </Drawer>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
