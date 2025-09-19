// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 — Сторінку не знайдено</h1>
      <p>Можливо, ви перейшли за неправильним посиланням.</p>
      <Link to="/">Повернутись на головну</Link>
    </div>
  );
}

export default NotFound;
