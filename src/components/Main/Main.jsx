import { useContext } from "react";

import editButton from "../../assets/images/edit-button.png";
import addButton from "../../assets/images/add-button.png";

import Card from "../Card/Card";
import Popup from "../Popup/Popup";
import NewCard from "../NewCard/NewCard";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser || !currentUser._id) {
    return null;
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          {currentUser.avatar && (
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className="profile__image"
            />
          )}

          <button
            type="button"
            className="button_type_edit-avatar"
            aria-label="Editar avatar"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              type="button"
              className="button_type_edit"
              onClick={onEditProfile}
            >
              <img
                src={editButton}
                alt="Editar perfil"
                className="button__icon"
              />
            </button>
          </div>

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img src={addButton} alt="Adicionar" className="button__icon" />
        </button>
      </section>

      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <Popup title="New Card">
        <NewCard />
      </Popup>
    </main>
  );
}
