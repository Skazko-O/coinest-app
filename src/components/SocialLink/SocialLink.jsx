import styles from './SocialLink.module.scss'

const SocialLink = ({href, label, iconId}) => {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.socialLink}
            >
                <svg className={styles.icon} with="24" height="24">
                    <use xlinkHref={`src/assets/images/icon/sprite_footer.svg#${iconId}`} />
                </svg>
            </a>
    );
};

export default SocialLink;