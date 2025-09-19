import styles from './Header.module.scss';

function Header() {
  return (
    <header>
  <div className={styles.pageName}>
    <h1>Dashboard</h1>
    <div className={styles.rightSection}>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon}>
          <use xlinkHref="assets/images/icon/sprite_header.svg#MagnifyingGlass" />
        </svg>
        <input type="text" id="search" name="search" placeholder="Search..." />
      </div>
      <div className={styles.circleGroup}>
        <button className={styles.circleBtn}>
          <svg>
            <use href="assets/images/icon/sprite_header.svg#ChatTeardropDots" />
          </svg>
        </button>
        <button className={styles.circleBtn}>
          <svg>
            <use xlinkHref="assets/images/icon/sprite_header.svg#Bell" />
          </svg>
        </button>
      </div>
      <div className={styles.userGroup}>
        <div>
          <a href="#" className={styles.userName}>
            Andrew Forbist
          </a>
        </div>
        <button className={styles.avatar}>
          <img
            src="/assets/images/icon/Avatar.png"
            alt={styles.avatar}
            className={styles.avatar}
          />
        </button>
      </div>
    </div>
  </div>
</header>
  );
}

export default Header;