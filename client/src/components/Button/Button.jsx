import "./Button.css";

function Button({
  type = "button",
  text,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default Button;