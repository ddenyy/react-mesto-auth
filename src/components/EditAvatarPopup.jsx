import PopupWithForm from "./PopupWithForm.jsx";
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value

    })
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="change_avatar" title="Обновить аватар" submitText="Сохранить" isOpen={isOpen} onClose={onClose}>
      <fieldset className="popup__contact-info">
        <div className="input-container input-container_single">
          <input ref={inputRef} name="avatar-image" type="url" className="popup__input" id="popup-change-avatar" autoComplete="off" placeholder="Ссылка на картинку" required />
          <span className="error-message popup-change-avatar-error">test</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;