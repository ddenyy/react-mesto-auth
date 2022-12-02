import "../index.css"
import React from 'react';
import { Link, Route } from 'react-router-dom';

function Header({ email, handleExit }) {

  const handleEmail = () => {
    handleExit();
  }

  return (
    <header className="header page__header">
      <div className="header__image"></div>
      <div className="header__info">
        <Route path="/profile">
        <Link className="header__button_profile" to = "/">Главная</Link>
        </Route>
        <p className="header__email">{email}</p>
        <Route path="/sign-up">
          <Link className="register__button_enter" to="/sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="register__button_enter">Регистрация</Link>
        </Route>
        <Route exact path="/">
          <Link className="header__button_profile" to = "/profile">Профиль</Link>
          <Link onClick={handleEmail}  to="/sign-in" className="register__button_enter">Выйти</Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;