import React from "react";

function Register({ handleRegister, unsuccessfulRegister }) {
  const [registerData, setRegisterData] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = registerData;

  function handleChange(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password)
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} name="form_register" className="form register__content">
        <input className="register__input" name="email" value={email} onChange={handleChange} type="text" placeholder="Email"></input>
        <input className="register__input" name="password" value={password} onChange={handleChange} type="password" placeholder="пароль"></input>
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
      <h3 className="register__caption">Уже зарегистрированы ?<button className="register__button_enter" type="button">Войти</button></h3>
    </div>
  );
}

export default Register;