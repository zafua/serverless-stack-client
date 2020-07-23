import React, { useState } from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useFormFields } from '../libs/hooksLib';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { onError } from '../libs/errorLib';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import { useHistory } from 'react-router-dom';

export default function Signup() {
    const[newUser, setNewUser] = useState(null);
    const[fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword:"",
        confirmationCode:""
    });
    const { userHasAuthenticated } = useAppContext();
    const[isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    
    async function handleFormSubmit(event){
        event.preventDefault();

        setIsLoading(true);

        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });

            setIsLoading(false);
            setNewUser(newUser);

        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
        setNewUser("ok");
        setIsLoading(false);
    }

    async function handleConfirmationFormSubmit(event){
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function validateForm(){
        return (
            fields.email.length > 0 && 
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm(){
        return fields.confirmationCode.length > 0;
    }

    function renderForm(){
        return (
            <form onSubmit={handleFormSubmit}>
                <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        onChange={handleFieldChange}
                        value={fields.email}
                    />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.password}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bssize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton 
                    block
                    disabled={!validateForm()}
                    isLoading={isLoading}
                    type="submit">
                    Signup
                </LoaderButton>
            </form>        
        );
    }

    function renderConfirmationForm(){
        return (
            <form onSubmit={handleConfirmationFormSubmit}>
                <FormGroup controlId="confirmationCode" bssize="large">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    disabled={!validateConfirmationForm()}
                    isLoading={isLoading}
                    type="submit">
                        Verify
                    </LoaderButton>
            </form>
        );
    }

    return (
        <div className="signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}