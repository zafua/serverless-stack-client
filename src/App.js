import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import { AppContext } from './libs/contextLib';
import Routes from './Routes';
import './App.css';

function App() {
  //login oldu mu bakmak için
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  //tarayıcı sesssion'ı yüklenmeden uygulamayı yüklememek için
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);

    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout(){
    await Auth.signOut();
    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">Uze Notes</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          {isAuthenticated
            ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            : <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>            
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer> 
              </>
          }
  
          </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
