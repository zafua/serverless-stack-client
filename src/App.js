import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes';

function App() {
  return (
    <div className="App container">
      <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">Uze Notes</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>            
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>   
          </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
