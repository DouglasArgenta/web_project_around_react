export default function PopupWithImage({ card, onClose }) {
  const isOpen = Boolean(card);

  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
          aria-label="Fechar imagem"
        />

        {card && (
          <>
            <img src={card.link} alt={card.name} className="popup__image" />
            <p className="popup__title">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}
