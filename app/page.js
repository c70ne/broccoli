import styles from './Home.module.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export default function Page() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}