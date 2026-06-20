import "./SearchBar.css";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <input
      className="search-bar"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;