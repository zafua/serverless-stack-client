import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import LoaderButton from '../components/LoaderButton';
import './Login.css';

export default function Login() {
    //login olduğunda app contexti güncellemek için
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //redirect için
    const history = useHistory();
    //login sırasında butonu loading yapmak için
    const [isLoading, setIsLoading] = useState(false);

    function validateForm(){
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton 
                    block
                    disabled={!validateForm()}
                    isLoading={isLoading}
                    type="submit">
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}