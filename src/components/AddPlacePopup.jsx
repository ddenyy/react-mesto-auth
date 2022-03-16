import PopupWithForm from "./PopupWithForm.jsx";
import React from "react"

function AddPlacePopup({ isOpen, onClose, onAddPlace, canClean }) {

  const [pictureName, setPictureName] = React.useState("");
  const [pictureLink, setPictureLink] = React.useState("");


  function handleСhangePictureName(e) {
    setPictureName(e.target.value)
  }

  function handleСhangePictureLink(e) {
    setPictureLink(e.target.value)
  }
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: pictureName,
      link: pictureLink
    })
  }

  // очищаем поля 
  React.useEffect(() => {
    if (isOpen) {
      setPictureName("")
      setPictureLink("")
    }
  }, [isOpen])



  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} name="add_picture" title="Новое место" submitText="Добавить" isOpen={isOpen} onClose={onClose}>
      <fieldset className="popup__contact-info">
        <div className="input-container">
          <input value={pictureName} onChange={handleСhangePictureName} name="picture-name" type="text" className="popup__input" id="popup-picture-name" autoComplete="off" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="error-message popup-picture-name-error">test</span>
        </div>
        <div className="input-container">
          <input value={pictureLink} onChange={handleСhangePictureLink} name="picture-link" type="url" className="popup__input" id="popup-picture-link" autoComplete="off" placeholder="Ссылка на картинку" required />
          <span className="error-message popup-picture-link-error">test</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;