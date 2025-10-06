import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page not found</h1>
      <p>You may have clicked on the wrong link.</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
}

export default NotFound;
