import React, { useRef } from 'react';
import './SignupScreen.css';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value)
            .then((authUser) => {
                alert("Registered successfully");
            }).catch(error => {
                alert(`Please register yourself first by entering email and password above and then clicking on the SignUpNow option. Email should have '@ and .com' inside it and password should be atleast 5 characters.`);
                emailRef.current.value = '';
                passwordRef.current.value = '';
            })
    };

    const signIn = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
            })
            .catch(error => {
                alert("Invalid email ID or password " + error);
                emailRef.current.value = '';
                passwordRef.current.value = '';
            })
    };
    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder='Email' type='email' />
                <input ref={passwordRef} placeholder='Password' type='password' />
                <button type="submit" onClick={signIn}>Sign In</button>

                <h4>
                    <span className='signupScreen__gray'>New to Netflix? </span>
                    <span className='signupScreen__link' onClick={register}>Sign Up now.</span>
                </h4>
            </form>
        </div>
    );
}

export default SignupScreen;
