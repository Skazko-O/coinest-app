function SearchInput({ placeholder = 'Search...', id = 'search', name = 'search' }) {
  return (
    <div className="searchWrapper">
      <svg className="searchIcon" aria-hidden="true">
        <use xlinkHref="assets/images/icon/sprite_header.svg#MagnifyingGlass" />
      </svg>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className="searchInput"
      />
    </div>
  );
}

export default SearchInput;
