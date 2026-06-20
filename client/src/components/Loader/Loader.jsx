import "./Loader.css";

function Loader({
  size = "medium",
  text = "Loading...",
}) {
  return (
    <div className="loader-container">

      <div className={`spinner spinner-${size}`}></div>

      <p>{text}</p>

    </div>
  );
}

export default Loader;