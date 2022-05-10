import React from "react";
import { Link } from "react-router-dom";
import useFormWithValidation from '../hooks/useFormWithValidation.jsx';
function Register({ handleRegister, unsuccessfulRegister }) {
  // const [registerData, setRegisterData] = React.useState({
  //   email: '',
  //   password: '',
  // });
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();


  // function handleChange(e) {
  //   setRegisterData({
  //     ...registerData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.email, values.password)
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm])

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} name="form_register" className="form register__content" noValidate >
        <label className="register__label">
          <input className="register__input" name="email" value={values.email || ''} onChange={handleChange} type="email" placeholder="Email" />
          <span className="register__error" id="email-error">
            {errors.email || ''}
          </span>
        </label>
        <label className="register__label">
          <input className="register__input" name="password" value={values.password || ''} onChange={handleChange} type="password" placeholder="пароль" minLength="2"/>
          <span className="register__error" id="password-error">
          {errors.password || ''}
          </span>
        </label>
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
      <h3 className="register__caption">Уже зарегистрированы ?<Link className="register__button_enter" to="/sign-in">Войти</Link></h3>
    </div>
  );
}

export default Register;