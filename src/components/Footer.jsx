import SocialLink from './SocialLink/SocialLink'

function Footer() {
    return (
        <footer>
            <div className="footerElement">
                <div className="copyright">
                    Copyright © 2024{" "}
                    <a href="https://peterdraw.com/" target="_blank" rel="noopener">
                        Peterdraw
                    </a>
                </div>
                <div className="footerMenu">
                    <div>Privacy Policy</div>
                    <div>Terms and conditions</div>
                    <div>Contact</div>
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
