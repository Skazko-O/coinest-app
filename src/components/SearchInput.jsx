function SearchInput({
  placeholder = 'Search...',
  id = 'search',
  name = 'search',
  value,
  onChange }) {
  return (
    <div className="searchWrapper">
      <svg className="searchIcon" aria-hidden="true">
        <use xlinkHref="assets/images/icon/sprite_header.svg#MagnifyingGlass" />
      </svg>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className="searchInput"
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
