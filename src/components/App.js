import logo from '../images/Vector.svg';
import '../pages/index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import api from '../utils/api.js';
import ImagePopup from "./ImagePopup.js"

function App() {
  const [isEditProfilePopupOpen, handleEditAvatarClick] = React.useState(false);
  const [isAddPlacePopupOpen, handleEditProfileClick] = React.useState(false);
  const [isEditAvatarPopupOpen, handleAddPlaceClick] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  
  const closeAllPopups = () => {
   handleEditAvatarClick(false);
   handleEditProfileClick(false);
   handleAddPlaceClick(false);
   handleCardClick(null);
  }

  return (
    <div className="background">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick = {handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}>
          <fieldset className="popup__fieldset">
            <label className="popup__field-container">
              <input value="Жан-Ив Кусто" name="name" id="name-input"
                className="popup__input popup__input_type_name" type="text" maxLength="40" minLength="2"
                placeholder="Имя профиля" required />
              <span className="name-input-error form__input-error"></span>
            </label>
            <label className="popup__field-container">
              <input value="Исследователь океана" name="job" id="job-input"
                className="popup__input popup__input_type_job" type="text" maxLength="200" minLength="2"
                placeholder="Описание профиля" required />
              <span className="job-input-error form__input-error"></span>
            </label>
          </fieldset>
          <button className="popup__button" type="submit">Сохранить</button>
        </PopupWithForm>


        <PopupWithForm
          name="add-place"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <fieldset className="popup__fieldset">
            <label className="popup__field-container">
              <input value="" name="name" id="name-image"
                className="popup__input popup__input_type_name-image" type="text" maxLength="30"
                minLength="2" placeholder="Название" required />
              <span className="name-image-error form__input-error"></span>
            </label>
            <label className="popup__field-container">
              <input value="" name="link" id="link-image"
                className="popup__input popup__input_type_link-image" type="url"
                placeholder="Ссылка на картинку" required />
              <span className="link-image-error form__input-error"></span>
            </label>
          </fieldset>
          <button className="popup__button" type="submit">Создать</button>
        </PopupWithForm>

        

        <PopupWithForm
        name="confirmation-delete"
        title="Вы уверены?">
              <fieldset className="popup__fieldset">
                <button className="popup__button">Да</button>
              </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="update-profile"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <fieldset className="popup__fieldset">
            <label className="popup__field-container">
              <input value="" name="info" id="info-img"
                className="popup__input popup__input_type_info-img" type="url" placeholder="Ссылка на картинку" required />
              <span className="info-img-error form__input-error"></span>
            </label>
          </fieldset>
          <button className="popup__button" type="submit">Сохранить</button>
        </PopupWithForm>

        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      </div>
    </div>
  );
}

export default App;
