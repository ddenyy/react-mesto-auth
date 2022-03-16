import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from '../utils/Api';
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Loader from './Loader.jsx';
import AcceptDeleteCardPopup from './AcceptDeleteCardPopup';
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectRoute from './ProtectedRoute.jsx';
import InfoTooltip from "./InfoTooltip.jsx";
import * as MestoAuth from "./MestoAuth.js"


// MestoAuth.register("somepasswoфывrd","emaiфывl@yandex.ru")
// .then((res) => {console.log(res)})
// .catch((err) => {console.log(err)})

function App() {
  // стейт открытия попапа редактирования профиля 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // стейт открытия попапа добавления карточки 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // стейт открытия поапап редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // стейт для открытия попапа подтверждения удаления
  const [isAcceptDeletePopupOpen, setIsAcceptDeletePopupOpen] = React.useState(false);
  // // стейт для удалённой карточки
  const [cardDelete, isCardDelete] = React.useState({});
  // стейт для открытия карточки на весь экран
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  // стейт для информации текущего пользователя 
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт для карточекы
  const [cards, setCards] = React.useState([]);
  // стейт для лоадера
  const [isLoader, setLoader] = React.useState(false);

  const [loggedIn, setIsLoggedIn] = React.useState(null);

  const history = useHistory();

  const [PopupRegister, setOpenPopupRegister] = React.useState(false);

  const [succesRegister, setIssuccesRegister] = React.useState(false);

  const [UserData, setUserData] = React.useState("");

  React.useEffect(() => {
    // рендер страницы
    api.renderUserAndCards()
      .then(([currentUserInfo, dataCards]) => {
        setCurrentUser(currentUserInfo);
        setCards(dataCards);
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    checkToken()
  }, [])
  React.useEffect(() => {
    if(loggedIn) {
      history.push("/")
    }
  }, [])

  // управление попапом изменение аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // управление попапом редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // управление попапом добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsAcceptDeletePopupOpen(false);
    setOpenPopupRegister(false);
  }

  // управление открытием картинки на весь экран 
  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleUpdateUser(data) {
    setLoader(true);
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false))
  }

  function handleUpdateAvatar(data) {
    setLoader(true)
    api.updateUserAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => setLoader(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    }
    else {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => { console.log(err) })
    }
  }

  // ф-ция подтверждения удаления
  function handleAcceptDelete() {
    handleCardDelete(cardDelete)
  }

  // ф-ция открытия попапа удаления карточки
  function handleOpenPopupDelete(data) {
    isCardDelete(data)
    setIsAcceptDeletePopupOpen(true);
  }

  // ф-ция управляет удалением карточки
  function handleCardDelete(card) {
    setLoader(true);
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((item) => item._id != card._id))
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoader(false))
  }

  function handleAddPlace(data) {
    setLoader(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false)
      })
  }

  function handleRegister(password, email) {
    return (
      MestoAuth.register(password, email)
    .then((res) => {
      if(res.data.email) {
        console.log(res)
        setIssuccesRegister(true);
        setOpenPopupRegister(true);
        history.push("/sign-in")
      }
      else {
        throw new Error("Что-то пошло не так!")
      }
    })
    );
  }

  function handleLogin(email, password) {
    return (MestoAuth.authorize(email, password)
    .then((res) => {
      console.log(res)
      if (!res) {
        unsuccessfulRegister()
      }
      if(res.token) {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true)
      }
      
    })
    );
  }

  function checkToken() {

    if(localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      MestoAuth.getContent(jwt)
      .then((res) => {
        if(res) {
          const {email} = res;
          setUserData(email);
          setIsLoggedIn(true);
          history.push("/");
        }
      })
    }
  }

  function unsuccessfulRegister () {
    setIssuccesRegister(false);
    setOpenPopupRegister(true);
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={loggedIn}/>
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} unsuccessfulRegister={unsuccessfulRegister}/>
            </Route>
            <Route path="/sign-up">
              <Register unsuccessfulRegister={unsuccessfulRegister} handleRegister={handleRegister}/>
            </Route>
            <ProtectRoute exact path="/" cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleOpenPopupDelete}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                component={Main}
                loggedIn={loggedIn}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
              <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
              />
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <Loader isOpen={isLoader} />
              <AcceptDeleteCardPopup
                isAccept={handleAcceptDelete}
                onClose={closeAllPopups}
                isOpen={isAcceptDeletePopupOpen}
              />
              <InfoTooltip onClose={closeAllPopups} isRegister={succesRegister} isOpen={PopupRegister} loggedIn={loggedIn}/>
        </div>
      </div>


    </currentUserContext.Provider>
  );
}

export default App;
