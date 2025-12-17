import trashIcon from "../../assets/images/Trash.svg";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const likeButtonClass = `button button_type_like ${
    card.isLiked ? "button_type_like-active" : ""
  }`;

  return (
    <li className="place-card">
      <button
        type="button"
        className="button button_type_delete"
        aria-label="Excluir cartão"
        onClick={() => onCardDelete(card)}
      >
        <img src={trashIcon} alt="Excluir" className="button__icon" />
      </button>

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
          className={likeButtonClass}
          aria-label="Curtir"
          aria-pressed={card.isLiked}
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}
