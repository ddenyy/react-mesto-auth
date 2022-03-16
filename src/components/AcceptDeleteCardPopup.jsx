import React from 'react';
import PopupWithForm from "./PopupWithForm.jsx";


function AcceptDeleteCardPopup({isOpen, isAccept, onClose}) {

  function handleDeleteCard (e) {
    e.preventDefault();
    isAccept()
  }

  return (
    <PopupWithForm onClose={onClose} onSubmit={handleDeleteCard} title="вы уверены ?" name="delete_card" submitText="да" isOpen={isOpen}></PopupWithForm>
  );
};

export default AcceptDeleteCardPopup;

