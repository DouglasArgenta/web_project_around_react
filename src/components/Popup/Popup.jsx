export default function Popup({ title, children, onClose }) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
