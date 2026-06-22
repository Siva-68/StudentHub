import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({
  value,
  onChange,
  placeholder = "Search student records...",
}) {
  return (
    <div className="search-bar-wrapper">
      <FaSearch className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;