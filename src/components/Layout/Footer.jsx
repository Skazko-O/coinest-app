import { Link } from 'react-router';
import SocialLink from '../SocialLink/SocialLink'

function Footer() {
    return (
        <footer>
            <div className="footerElement">
                <div className="copyright">
                    Copyright © 2025{" "}
                    <a href="https://github.com/Skazko-O" target="_blank" rel="noopener">
                        Skazko-O
                    </a>
                </div>
                <nav className="footerMenu">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
            <div className="socialLink">
                <SocialLink
                    href="https://www.Facebook.com/"
                    label="Facebook"
                    iconId="FacebookLogo"
                />
                <SocialLink
                    href="https://www.x.com/"
                    label="Twitter"
                    iconId="TwitterLogo"
                />
                <SocialLink
                    href="https://www.instagram.com/your_profile"
                    label="Instagram"
                    iconId="InstagramLogo"
                />
                <SocialLink
                    href="https://www.Youtube.com/"
                    label="Youtube"
                    iconId="YoutubeLogo"
                />
                <SocialLink
                    href="https://www.linkedin.com/in/skazko-oleksandr/"
                    label="Linkedin"
                    iconId="LinkedinLogo"
                />
            </div>
        </footer >
    );
}

export default Footer;
