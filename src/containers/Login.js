import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import { useFormFields } from '../libs/hooksLib';
import { onError } from '../libs/errorLib';
import LoaderButton from '../components/LoaderButton';
import './Login.css';

export default function Login() {
    // login olduğunda app contexti güncellemek için
    const { userHasAuthenticated } = useAppContext();
    // aşağıdaki iki satır yerine
    // useFormFields adlı custom hooks'u kullandık
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const[fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });
    // redirect için
    const history = useHistory();
    // login sırasında butonu loading yapmak için
    const [isLoading, setIsLoading] = useState(false);

    function validateForm(){
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
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
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
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