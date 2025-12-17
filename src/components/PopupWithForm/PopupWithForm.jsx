export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
          aria-label="Fechar popup"
        ></button>

        <h3 className="popup__title">{title}</h3>

        <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
