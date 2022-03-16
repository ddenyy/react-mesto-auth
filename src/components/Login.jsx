import React from "react"

function Login ({handleLogin, unsuccessfulRegister}) {
  const [UserData, setUserState] = React.useState({
    password: "",
    email: ""
  })

  const {password, email} = UserData;

  function handleChange (e) {
    const {name, value} = e.target;
    setUserState({
      ...UserData,
      [name] : value
    })
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(email, password)
    .catch(e => console.log(e))
    }


    return (
        <div className="register">
        <h2 className="register__title">Вход</h2>
          <form onSubmit={handleSubmit} name="form_register" className="form register__content">
              <input className="register__input" type="text" placeholder="Email" name="email" value={email} onChange={handleChange}></input>
              <input className="register__input" type="text" placeholder="пароль" name="password" value={password} onChange={handleChange}></input>
            <button type="submit" className="register__button register__button_submit">Войти</button>
          </form>
        </div>
    );
}

export default Login;