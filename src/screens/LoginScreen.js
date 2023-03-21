import React, { useState } from 'react';
import './LoginScreen.css'
import SignupScreen from './SignupScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const handleSignIn = (current) => {
        if (current === signIn)
        {
            setSignIn(!signIn)
        }

    }
    return (
        <div className='loginScreen'>
            <div className='loginScreen__background'>
                <img className='loginScreen__logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="login-screen" />
                <button className='loginScreen__button'
                    onClick={() => handleSignIn(signIn)}>Sign In</button>
                <div className='loginScreen__gradient'></div>
            </div>
            <div className='loginScreen__body'>
                {signIn ? (
                    <SignupScreen />
                ) :
                    (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at anytime</h2>
                            <h3>Ready to Watch? Enter your email to create or restart your membership.</h3>
                            <div className='loginScreen__input'>
                                <form>
                                    <input type='email'
                                        placeholder='Email Address' />
                                    <button
                                        onClick={() => setSignIn(true)}
                                        className='loginScreen__getStarted'>
                                        GET STARTED
                                    </button>
                                </form>

                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default LoginScreen