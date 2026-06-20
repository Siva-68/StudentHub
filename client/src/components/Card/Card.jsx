import "./Card.css";

function Card({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;