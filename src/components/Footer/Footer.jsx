import styles from './Footer.module.scss'

function Footer() {
    return (
        <footer>
            <div className={styles.copyright}>
                Copyright © 2024{" "}
                <a href="https://peterdraw.co/" target="_blank" rel="noopener">
                    Peterdraw
                </a>
            </div>
            <div className={styles.footerMenu}>
                <div>Privacy Policy</div>
                <div>Terms and conditions</div>
                <div>Contact</div>
            </div>
            {/* <div class="social-links">
    Reserved for future social media links
  </div> */}
        </footer>
    );
}

export default Footer;
