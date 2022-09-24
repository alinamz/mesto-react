import logo from '../images/Vector.svg';
import '../pages/index.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import api from '../utils/api.js';
import ImagePopup from "./ImagePopup.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';

function App() {
  const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCardId, setSelectedCardId] = React.useState(null);
  
  
// изменяем данные пользователя
  function handleUpdateUser(userData) {
    api.changeUserData(userData.name, userData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }
 // добавляем новый аватар
  function handleUpdateAvatar({ avatar }) {
    api.setProfileAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // добавляем новую карточку
  function handleAddPlaceSubmit(name, link) {
    console.log(name, link)
    api.addNewCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // закрываем все попапы
  const closeAllPopups = () => {
    handleEditAvatarClick(false);
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleCardClick(null);
    setIsConfirmPopupOpen(false);
  }

  // загрузка данных польователя на страницу
  React.useEffect(() => {
    const initialPromises = Promise.all([
      api.getUserData(),
      api.getInitalCards()
    ]);

    initialPromises
      .then(([profile, Cards]) => {
        setCards(Cards);
        setCurrentUser(profile)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  // удаляем карточку
  const  handleCardDeleteSubmit = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }

  // открываем попап удаления карточки для выбранной карточки
  function handleCardDelete(cardId) {
    setIsConfirmPopupOpen(true);
    setSelectedCardId(cardId)
  }

  // ставим лайк карточке
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header />
          <Main
            onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <DeleteCardPopup 
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteSubmit}
          cardId={selectedCardId}
         />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div >
    </CurrentUserContext.Provider>


  );
}

export default App;
