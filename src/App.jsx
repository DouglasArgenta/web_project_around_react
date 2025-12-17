import { useState } from "react";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PopupWithImage from "./components/PopupWithImage/PopupWithImage.jsx";
import EditProfilePopup from "./components/EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./components/EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./components/AddPlacePopup/AddPlacePopup.jsx";

import { initialCards } from "./utils/constants";

function App() {
  const [userName, setUserName] = useState("Jacques Cousteau");
  const [userDescription, setUserDescription] = useState("Explorador");
  const [avatar, setAvatar] = useState(
    new URL("./assets/images/profile-image.jpg", import.meta.url).href
  );

  const [cards, setCards] = useState(initialCards);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

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

  function handleUpdateUser({ name, about }) {
    setUserName(name);
    setUserDescription(about);
    closeAllPopups();
  }

  function handleUpdateAvatar({ avatar }) {
    setAvatar(avatar);
    closeAllPopups();
  }

  function handleAddPlace(card) {
    setCards([card, ...cards]);
    closeAllPopups();
  }

  function handleCardLike(cardToLike) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card === cardToLike ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  }

  function handleCardDelete(cardToDelete) {
    setCards((prevCards) => prevCards.filter((card) => card !== cardToDelete));
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />

        <Main
          cards={cards}
          avatar={avatar}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          name={userName}
          about={userDescription}
        />

        <Footer />

        <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          currentName={userName}
          currentAbout={userDescription}
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
  );
}

export default App;
