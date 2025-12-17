import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useState } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
    setAvatar("");
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Alterar a foto do perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        name="avatar"
        placeholder="Link para a nova foto"
        required
        value={avatar}
        onChange={handleChange}
      />

      <button type="submit" className="popup__button_type_save">
        Salvar
      </button>
    </PopupWithForm>
  );
}
