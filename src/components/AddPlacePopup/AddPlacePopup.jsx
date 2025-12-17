import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
      isLiked: false,
    });

    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Novo local"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        placeholder="Título"
        minLength="1"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="url"
        className="popup__input"
        placeholder="Link da imagem"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <button type="submit" className="popup__button_type_save">
        Salvar
      </button>
    </PopupWithForm>
  );
}
