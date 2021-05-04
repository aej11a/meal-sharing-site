import React, { useState } from 'react'
import { useUser } from '../App'
import { ButtonGroup, Button, TextField, Grid } from '@material-ui/core'
import { db } from '../firebase'

const createUser = async ({ email, password, displayName, auth, setUser }) => {
    return await auth
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
            db.collection('users')
                .doc(credential.user.uid)
                .set({
                    uid: credential.user.uid,
                    email: credential.user.email,
                    name: displayName,
                })
                .then(() =>
                    setUser({
                        uid: credential.user.uid,
                        email: credential.user.email,
                        name: displayName,
                    })
                )
        })
}

const signIn = async ({ email, password, auth, setUser }) => {
    return await auth
        .signInWithEmailAndPassword(email, password)
        .then((credential) => {
            db.collection('users')
                .doc(credential.user.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const user = doc.data()
                        setUser(user)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!')
                    }
                })
        })
}

const CreateAccount = () => {
    const { auth, setUser } = useUser()
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
                    try {
                        setCreateState({ ...createState, loading: true })
                        setCreateState({
                            ...createState,
                            data: await createUser({
                                auth,
                                email: e.target.email.value,
                                password: e.target.password.value,
                                displayName:
                                    e.target.firstname.value +
                                    ' ' +
                                    e.target.lastname.value,
                                setUser,
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
                    <TextField
                        variant="outlined"
                        label="email"
                        name="email"
                        type="text"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="password"
                        name="password"
                        type="password"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="firstname"
                        name="firstname"
                        type="text"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="lastname"
                        name="lastname"
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
    const { auth, setUser } = useUser()
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn({
                        email: e.target.email.value,
                        password: e.target.password.value,
                        auth,
                        setUser,
                    })
                }}
            >
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="email"
                        type="text"
                        name="email"
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="password"
                        type="password"
                        name="password"
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
    const { user, logout } = useUser()

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

    if (user) {
        return (
            <div>
                <p>You are signed in as {user && user.name}</p>
                <Button onClick={logout}>Log Out</Button>
            </div>
        )
    } else
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
