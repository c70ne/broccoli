import styles from './Home.module.css'
import Modal from './Modal'

export default function Main() {
  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>A better way to enjoy every day.</h1>
      <h2 className={styles.h2}>Be the first to know when we launch.</h2>
      <Modal />
    </div>
  )
}