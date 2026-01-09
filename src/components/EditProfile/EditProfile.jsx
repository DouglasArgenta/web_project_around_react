import { useState, useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile({ isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="popup__input"
        name="about"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" className="popup__button_type_save">
        Salvar
      </button>
    </PopupWithForm>
  );
}
