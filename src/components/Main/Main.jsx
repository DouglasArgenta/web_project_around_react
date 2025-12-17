import editButton from "../../assets/images/edit-button.png";
import addButton from "../../assets/images/add-button.png";

import Card from "../Card/Card";

export default function Main({
  cards,
  avatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  name,
  about,
}) {
  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img src={avatar} alt="Avatar" className="profile__image" />
          <button
            type="button"
            className="button_type_edit-avatar"
            aria-label="Editar avatar"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__name">{name}</h1>

            <button
              type="button"
              className="button_type_edit"
              onClick={onEditProfile}
            >
              <img
                src={editButton}
                alt="Edit button"
                className="button__icon"
              />
            </button>
          </div>

          <p className="profile__description">{about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img src={addButton} alt="Add button" className="button__icon" />
        </button>
      </section>

      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card.name}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
