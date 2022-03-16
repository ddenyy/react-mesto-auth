import "../index.css"
import React from 'react';
import {Link, useHistory} from 'react-router-dom';

function Header({}) {
  const history = useHistory();
   
  const checkRoute = () => {
    history.push(window.location.pathname === "/sign-in" ? "/sign-up" : "/sign-in")
  }

  return (
    <header className="header page__header">
      <div className="header__image"></div>
      <button onClick={checkRoute} className="register__button_enter header__button_crossing" type="button">{window.location.pathname === "/sign-in" ? "Регистрация" : "Войти"}</button>
    </header>
  );
}

export default Header;