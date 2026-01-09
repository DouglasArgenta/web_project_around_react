import { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!isOpen && avatarRef.current) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
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
        ref={avatarRef}
      />

      <button type="submit" className="button popup__button_type_save">
        Salvar
      </button>
    </PopupWithForm>
  );
}
