import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function NewCard({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
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
        name="title"
        placeholder="Título"
        minLength="1"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />

      <input
        type="url"
        className="popup__input"
        name="link"
        placeholder="Link da imagem"
        required
        value={link}
        onChange={handleLinkChange}
      />

      <button type="submit" className="button popup__button_type_save">
        Criar
      </button>
    </PopupWithForm>
  );
}
