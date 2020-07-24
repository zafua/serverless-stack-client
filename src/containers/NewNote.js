import React, { useState, useRef } from 'react';
import { FormControl, FormLabel, FormGroup, Form } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import "./NewNote.css";
import { useHistory } from 'react-router-dom';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awsLib';

export default function NewNote(){
    const file = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const history = useHistory();

    async function handleSubmit(event){
        event.preventDefault();

        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`
            );

            return;
        };
        setIsLoading(true);

        try {
            const attachment = file.current ? await s3Upload(file.current) : null;

            await createNote({content, attachment});
            history.push('/');
            
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createNote(note) {
        return API.post("notes", "/notes", {
            body: note
        });
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function validateForm(){
        return content.length > 0;
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        autoFocus
                        value={content}
                        as="textarea"
                        rows="3"
                        onChange={e=>setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="file">
                    <FormLabel>Attachment</FormLabel>
                    <Form.File 
                        onChange={handleFileChange} 
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bssize="large"
                    bsstyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm}
                > Add
                </LoaderButton>
            </form>
        </div>
    );
}