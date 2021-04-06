import React, { useEffect, useState } from 'react'
import {
    useCreateUserWithEmailAndPassword as useCreateUser,
    useSignInWithEmailAndPassword as useSignIn,
    useAuthState,
} from 'react-firebase-hooks/auth'
import { firebase } from '../firebase'
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
            {JSON.stringify({ createState })}
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
                    <label>
                        {' '}
                        Email: <br />
                        <input name="email" type="text" />
                    </label>
                </div>
                <div style={{ margin: 10 }}>
                    <label>
                        {' '}
                        Password: <br />
                        <input name="password" type="password" />
                    </label>
                </div>
                <div style={{ margin: 10 }}>
                    <label>
                        {' '}
                        First Name: <br />
                        <input name="firstname" type="text" />
                    </label>
                </div>
                <div style={{ margin: 10 }}>
                    <label>
                        {' '}
                        Last Name: <br />
                        <input name="lastname" type="text" />
                    </label>
                </div>
                <button type="submit" style={{ margin: 10 }}>
                    Create Account
                </button>
            </form>
        </>
    )
}

const SignIn = () => {
    const [
        signInWithEmailAndPassword,
        signedInUser,
        signinLoading,
        signinError,
    ] = useSignIn(auth)

    return signinLoading ? (
        'Loading...'
    ) : (
        <>
            {JSON.stringify({ signedInUser, signinError, signinLoading })}
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
                    <label>
                        {' '}
                        Email: <br />
                        <input name="email" type="text" />
                    </label>
                </div>
                <div style={{ margin: 10 }}>
                    <label>
                        {' '}
                        Password: <br />
                        <input name="password" type="password" />
                    </label>
                </div>
                <button type="submit" style={{ margin: 10 }}>
                    Sign In
                </button>
            </form>
        </>
    )
}

export const AccountPage = () => {
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
                <p>
                    You are signed in as{' '}
                    {JSON.stringify(user.providerData[0].displayName)}
                </p>
                <button onClick={logout}>Log Out</button>
            </div>
        )
    else
        return (
            <div>
                <button
                    disabled={showCreate}
                    className={'create-account-button'}
                    onTouchStart={switchToCreate}
                    onMouseDown={switchToCreate}
                >
                    Create Account
                </button>
                <button
                    disabled={showSignIn}
                    className={'sign-in-button'}
                    onTouchStart={switchToSignIn}
                    onMouseDown={switchToSignIn}
                >
                    Sign In
                </button>

                {displayedTab === DISPLAY_STATES.create ? (
                    <CreateAccount />
                ) : (
                    <SignIn />
                )}
            </div>
        )
}
