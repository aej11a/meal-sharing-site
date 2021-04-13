import React, { useState } from 'react'
import { ButtonGroup, Button, TextField, Grid } from '@material-ui/core'
import {
    useSignInWithEmailAndPassword as useSignIn,
    useAuthState,
} from 'react-firebase-hooks/auth'
import { firebase } from '../../firebase'
const auth = firebase.auth()
const logout = () => {
    firebase.auth().signOut()
}

const createUser = async ({ email, password, displayName }) => {
    return await auth
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
            console.log(credential)
            credential.user.updateProfile({ displayName })
        })
}

const CreateAccount = () => {
    const [createState, setCreateState] = useState({
        loading: false,
        data: null,
        error: null,
    })

    return createState.loading ? (
        'Loading...'
    ) : (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    console.log({
                        email: e.target[0].value,
                        password: e.target[1].value,
                        displayName:
                            e.target[2].value + ' ' + e.target[3].value,
                    })
                    try {
                        setCreateState({ ...createState, loading: true })
                        setCreateState({
                            ...createState,
                            data: await createUser({
                                email: e.target[0].value,
                                password: e.target[1].value,
                                displayName:
                                    e.target[2].value + e.target[3].value,
                            }),
                            loading: false,
                        })
                    } catch (e) {
                        setCreateState({
                            ...createState,
                            loading: false,
                            error: e,
                        })
                    }
                }}
            >
                <div style={{ margin: 10 }}>
                    <TextField variant="outlined" label="email" type="text" />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="password"
                        type="password"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="firstname"
                        type="text"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="lastname"
                        type="text"
                    />
                </div>
                <Button
                    type="submit"
                    style={{ margin: 10 }}
                    variant="contained"
                >
                    Create Account
                </Button>
            </form>
        </>
    )
}

const SignIn = () => {
    const [
        signInWithEmailAndPassword,
        // eslint-disable-next-line
        signedInUser,
        signinLoading,
        // eslint-disable-next-line
        signinError,
    ] = useSignIn(auth)

    return signinLoading ? (
        'Loading...'
    ) : (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    signInWithEmailAndPassword(
                        e.target[0].value,
                        e.target[1].value
                    )
                }}
            >
                <div style={{ margin: 10 }}>
                    <TextField variant="outlined" label="email" type="text" />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="password"
                        type="password"
                    />
                </div>
                <Button
                    type="submit"
                    style={{ margin: 10 }}
                    variant="contained"
                >
                    Sign In
                </Button>
            </form>
        </>
    )
}

export const AccountPage = () => {
    // eslint-disable-next-line
    const [user, loading, error] = useAuthState(auth)

    // create an enum to keep states clean
    const DISPLAY_STATES = { create: 0, signin: 1 }
    // default to create-account screen
    const [displayedTab, setDisplayedTab] = React.useState(
        DISPLAY_STATES.create
    )

    // create booleans for current display state for convenience
    const showCreate = displayedTab === DISPLAY_STATES.create
    const showSignIn = displayedTab === DISPLAY_STATES.signin

    // create functions for switching state
    const switchToCreate = () => setDisplayedTab(DISPLAY_STATES.create)
    const switchToSignIn = () => setDisplayedTab(DISPLAY_STATES.signin)

    if (user)
        return (
            <div>
                <p>You are signed in as {user.providerData[0].displayName}</p>
                <Button onClick={logout}>Log Out</Button>
            </div>
        )
    else
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'inline',
                        marginTop: 25,
                    }}
                >
                    <ButtonGroup
                        color="secondary"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            disabled={showCreate}
                            onTouchStart={switchToCreate}
                            onMouseDown={switchToCreate}
                        >
                            Create Account
                        </Button>
                        <Button
                            disabled={showSignIn}
                            onTouchStart={switchToSignIn}
                            onMouseDown={switchToSignIn}
                        >
                            Sign In
                        </Button>
                    </ButtonGroup>

                    {displayedTab === DISPLAY_STATES.create ? (
                        <CreateAccount />
                    ) : (
                        <SignIn />
                    )}
                </div>
            </Grid>
        )
}
