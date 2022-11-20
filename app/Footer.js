import styles from './Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer_text}>
        Made in Melbourne &hearts; <br />
        &copy; 2016 Broccoli & Co.
      </p>
    </footer>
  )
}