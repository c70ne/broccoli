import styles from './Home.module.css'

export default function Header() {
  return (
    <nav className={styles.header}>
      <p className={styles.header_text}>Broccoli & Co.</p>
    </nav>
  )
}