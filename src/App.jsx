import { useState, useEffect } from "react";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PopupWithImage from "./components/PopupWithImage/PopupWithImage.jsx";
import EditProfilePopup from "./components/EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./components/EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./components/AddPlacePopup/AddPlacePopup.jsx";

import api from "./utils/api";
import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(console.error);
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, !isLiked)

      .then((newCard) => {
        console.log(newCard);
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlace({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page">
        <div className="page__content">
          <Header />

          <Main
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
          />

          <Footer />

          <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
