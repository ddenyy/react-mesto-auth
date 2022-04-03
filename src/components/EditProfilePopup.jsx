import PopupWithForm from "./PopupWithForm.jsx";
import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, useEscapePress}) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUserData = React.useContext(currentUserContext);


  React.useEffect(() => {
    if (currentUserData.name) {
      setName(currentUserData.name);
      setDescription(currentUserData.about);
    }
  }, [currentUserData, isOpen])


  function handleСhangeName(e) {
    setName(e.target.value)
  }


  function handleСhangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit_profile" title="редактировать профиль" submitText="Сохранить" isOpen={isOpen} onClose={onClose} useEscapePress={useEscapePress} >
      <fieldset className="popup__contact-info">
        <div className="input-container">
          <input value={name || ''} onChange={handleСhangeName} name="user-name" type="text" className="popup__input" id="popup-edit-username" placeholder="Введите имя" autoComplete="off" required minLength="2" maxLength="40" />
          <span className="error-message popup-edit-username-error">test</span>
        </div>
        <div className="input-container">
          <input value={description} onChange={handleСhangeDescription} name="user-job" type="text" className="popup__input" id="popup-edit-job" autoComplete="off" placeholder="чем занимаетесь ?" required minLength="2" maxLength="200" />
          <span className="error-message popup-edit-job-error">test</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;