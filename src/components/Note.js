import React from 'react';
import { Card } from 'react-bootstrap';

export default function Note({note, ...props}){
    return (
        <Card key={note.noteId}>
            <Card.Body>
                <Card.Title>{note.content.trim().split("\n")[0]}</Card.Title>
                <Card.Link href={`/notes/${note.noteId}`}>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </Card.Link>
            </Card.Body>
        </Card>
    );
}