import SocialLink from '../SocialLink/SocialLink'

function Footer() {
    return (
        <footer>
            <div className="footerElement">
                <div className="copyright">
                    Copyright © 2025{" "}
                    <a href="https://skazko-o.github.io/My_Homeworks/" target="_blank" rel="noopener">
                        Skazko-O
                    </a>
                </div>
                <div className="footerMenu">
                   <a href="#" target="_blank" rel="noopener">Privacy Policy</a>
                    <a href="#" target="_blank" rel="noopener">Terms and conditions</a>
                    <a href="#" target="_blank" rel="noopener">Contact</a>
                </div>
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
