import { useContext } from "react";
import trashIcon from "../../assets/images/Trash.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card || !currentUser || !currentUser._id) {
    return null;
  }

  const isOwn =
    typeof card.owner === "string"
      ? card.owner === currentUser._id
      : card.owner?._id === currentUser._id;

  const isLiked = card.isLiked;

  const cardLikeButtonClassName = `button button_type_like ${
    isLiked ? "button_type_like-active" : ""
  }`;

  return (
    <li className="place-card">
      {isOwn && (
        <button
          type="button"
          className="button_type_delete"
          onClick={() => onCardDelete(card)}
          aria-label="Excluir"
        >
          <img src={trashIcon} alt="Excluir" className="button__icon" />
        </button>
      )}

      <img
        className="place-card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />

      <div className="place-card__footer">
        <h2 className="place-card__title">{card.name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
          aria-label="Curtir"
        />
      </div>
    </li>
  );
}
