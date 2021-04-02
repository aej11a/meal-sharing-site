import React from 'react'
import {
    useCreateUserWithEmailAndPassword as useCreateUser,
    useSignInWithEmailAndPassword as useSignIn,
} from 'react-firebase-hooks/auth'
import { firebase } from '../firebase'
const auth = firebase.auth()

const CreateAccount = () => {
    const [
        createUserWithEmailAndPassword,
        createdUser,
        createLoading,
        createError,
    ] = useCreateUser(auth)

    return createLoading ? (
        'Loading...'
    ) : (
        <>
            {JSON.stringify({ createdUser, createError, createLoading })}
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createUserWithEmailAndPassword(
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
                    Submit
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
}

export const AccountPage = () => {
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
