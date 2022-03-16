 


 function InfoTooltip ({onClose, name, isOpen, loggedIn, isRegister}) {
     return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__window">
          <button type="button" className={`popup__button-exit popup__button-exit_place_${name}`} onClick={onClose} ></button>
          <div className={`popup__picture_access ${isRegister ? "" : "popup__picture_access_error"}`}></div>
          
          <p className="popup__title_access">{isRegister ? "Вы успешно зарегистрировались !" : "что-то пошло не так :("}</p>
        </div>
      </div>
     );
     
 }
 

 export default InfoTooltip;
