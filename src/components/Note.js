import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, Card } from 'react-bootstrap';

export default function Note({note, ...props}){
    return (
        <Card key={note.noteId} to={`/notes/${note.noteId}`}>
            <Card.Body>
                <Card.Title>{note.content.trim().split("\n")[0]}</Card.Title>
                <Card.Text>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}