function Header() {
  return (
    <header>
  <div className="pageName">
    <h1>Dashboard</h1>
    <div className="rightSection">
      <div className="searchWrapper">
        <svg className="searchIcon">
          <use xlinkHref="src/assets/images/icon/sprite_header.svg#MagnifyingGlass" />
        </svg>
        <input type="text" id="search" name="search" placeholder="Search..." />
      </div>
      <div className="circleGroup">
        <button className="circleBtn">
          <svg>
            <use href="src/assets/images/icon/sprite_header.svg#ChatTeardropDots" />
          </svg>
        </button>
        <button className="circleBtn">
          <svg>
            <use xlinkHref="src/assets/images/icon/sprite_header.svg#Bell" />
          </svg>
        </button>
      </div>
      <div className="userGroup">
        <div>
          <a href="#" className="userName">
            Andrew Forbist
          </a>
        </div>
        <button className="avatar">
          <img
            src="src/assets/images/icon/Avatar.png"
            alt="avatar"
            className="avatar"
          />
        </button>
      </div>
    </div>
  </div>
</header>
  );
}

export default Header;