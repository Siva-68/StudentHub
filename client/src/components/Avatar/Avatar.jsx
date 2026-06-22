import "./Avatar.css";

function Avatar({
  src,
  alt = "Avatar",
  size = 60,
}) {
  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const style = {
    width: size,
    height: size,
    fontSize: size * 0.4,
  };

  if (src) {
    return (
      <img
        className="avatar avatar-image"
        src={src}
        alt={alt}
        style={style}
      />
    );
  }

  return (
    <div className="avatar avatar-initials" style={style}>
      {getInitials(alt)}
    </div>
  );
}

export default Avatar;