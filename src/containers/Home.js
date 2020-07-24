import React, { useEffect, useState } from "react";
import "./Home.css";
import { useAppContext } from "../libs/contextLib";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from '../libs/errorLib';
import { API } from "aws-amplify";
import Note from '../components/Note';
import { Link } from "react-router-dom";

export default function Home() {
    const {isAuthenticated} = useAppContext();
    const [notes,setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }
        
            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                onError(e);
            }
      
          setIsLoading(false);
        }
      
        onLoad();
    }, [isAuthenticated]);
      


    function loadNotes(){
        return API.get("notes", "/notes");
    }

    function renderNotesList(notes) {
        return [{}].concat(notes).map((note, i) =>
          i !== 0 ? (
            <Note key={note.noteId} note={note} />
          ) : (
            <LinkContainer key="new" to="/notes/new">
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new note
                </h4>
              </ListGroupItem>
            </LinkContainer>
          )
        );
      }

    function renderNotes(){
        return (
            <div className="notes">
            
                <ListGroup>
                    {!isLoading && renderNotesList(notes)}
                </ListGroup>
                
            </div>
        );
    }

    function renderLander() {
        return (
          <div className="lander">
            <h1>Cotes</h1>
            <p>Cloud based note taking app</p>
            <div>
              <Link to="login" className="btn btn-info btn-lg">Login</Link>
              <Link to="login" className="btn btn-success btn-lg">Signup</Link>
            </div>
          </div>
        );
      }

    return (
        <div className="Home">
          {isAuthenticated ? renderNotes() : renderLander()}
        </div>
      );

}