import "./Input.css";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
}) {
  return (
    <div className="input-group">

      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}

      <input
        id={name}
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete="off"
      />

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;