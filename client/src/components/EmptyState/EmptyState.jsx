import "./EmptyState.css";

function EmptyState({
  title = "No Data Found",
  message = "Nothing to display here yet.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="20" width="90" height="65" rx="8" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="2"/>
          <rect x="25" y="32" width="50" height="6" rx="3" fill="#a5b4fc"/>
          <rect x="25" y="44" width="35" height="5" rx="2.5" fill="#c7d2fe"/>
          <rect x="25" y="56" width="42" height="5" rx="2.5" fill="#c7d2fe"/>
          <circle cx="85" cy="70" r="18" fill="#818cf8" opacity="0.15"/>
          <path d="M79 70 L84 75 L93 65" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;