import "../blocks/userProfile/_main/userProfile_main.css"
import React from "react";
import { Link, Route } from 'react-router-dom';
import Card from "./Card.jsx";
import { currentUserContext } from "../contexts/CurrentUserContext";

function UserProfile({ onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUserData = React.useContext(currentUserContext);

    return (
        <div className="userProfile">
            <section className="profile content__profile">
                <div className="profile__image" style={{ backgroundImage: `url(${currentUserData.avatar})` }} onClick={onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__username">{currentUserData.name}</h1>
                    <button className="profile__follow_button">подписаться✓</button>
                    <p className="profile__job">{currentUserData.about}</p>
                </div>
                <div className="userProfile__memes">
                <p className="userProfile__title_mem">Девиз</p>
                 <img className="userProfile__image"/>
                </div>

            </section>
            <section className="userProfile_table">
                <div className="userProfile_tags">
                    <h2 className="userProfile__subtitle">Предпочтения стилей</h2>
                    <table className="userProfile__table">
                        <ul className="userProfile__table_elem">@ Теггинг</ul>
                        <ul className="userProfile__table_elem">@ Бомбинг</ul>
                        <ul className="userProfile__table_elem">@ Классика</ul>
                    </table>
                </div>
                <div className="userProfile_tags">
                    <h2 className="userProfile__subtitle">Статистика</h2>
                    <table className="userProfile__table">
                        <ul className="userProfile__table_elem">Подписчиков = 123</ul>
                        <ul className="userProfile__table_elem">Просмотры = 321</ul>
                        <ul className="userProfile__table_elem">Лайков = 123123</ul>
                    </table>
                </div>
            </section>
            <section className="places page__places">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          );
        })}
      </section>
        </div>
    );


}

export default UserProfile;