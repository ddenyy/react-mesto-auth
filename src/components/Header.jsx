import "../index.css"
import React from 'react';
import { Link, useHistory, Route } from 'react-router-dom';

function Header({ email, handleExit }) {
  const history = useHistory();
  
  const checkRoute = () => {
    switch(window.location.pathname) {
      case "/sign-in":   
        history.push("/sign-up")
        break;
      case "/sign-up":  
        history.push("/sign-in");
        break;
      case "/":
        handleExit()
        history.push("/sign-in");
        break;
    }
  }

  return (
    <header className="header page__header">
      <div className="header__image"></div>
      <div className="header__info">
        <p className="header__email">{email}</p>
        <Route path="/sign-up">
          <button onClick={checkRoute} className="register__button_enter " type="button">Войти</button>
        </Route>
        <Route path="/sign-in">
          <button onClick={checkRoute} className="register__button_enter " type="button">Регистрация</button>
        </Route>
        <Route exact path="/">
          <button onClick={checkRoute} className="register__button_enter " type="button">Выйти</button>
        </Route>
      </div>
    </header>
  );
}

export default Header;