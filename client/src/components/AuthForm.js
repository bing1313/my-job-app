import { useState, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-content';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const switchAuthModelHandler = () => {
        setIsLogin((prevState) => !prevState);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        const emailInput = emailInputRef.current.value;
        const passwordInput = passwordInputRef.current.value;

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRXuNEQaB1GgHbreRti7FuvO3TGJvzZqs';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRXuNEQaB1GgHbreRti7FuvO3TGJvzZqs'
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
                returnSecureToken: true
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return new Error("Authentification failed");
            }
        }).then(data => {
            console.log(data);
            const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            authCtx.login(data.idToken, expirationTime.toISOString(), data.localId);
            navigate('/profile');
        }).catch(error => {
            alert(error.message);
        })
    }

    return (
        <section>
            <Container className={classes.AuthForm}>
             <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" ref={emailInputRef}></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" required ref={passwordInputRef} ></input>
                </div>
                <div>
                    <button onClick={submitHandler}>{isLogin ? "Login" : "Create Account"}</button>
                    <button onClick={switchAuthModelHandler}>{isLogin ? "Create new account" : "Log in with existing account"}</button>
                </div>
                
            </form>
            </Container>
        </section>
    )
}

export default AuthForm;