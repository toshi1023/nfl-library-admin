import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import styles from '../styles/layouts/layout.module.scss'

type Props = { children: ReactNode }

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div id={styles.layout}>
      <Header />
      <Sidebar />

        {/* childrenが子要素を指しており、レイアウト以外のページコンポーネントが表示される */}
        <div className={styles.main}>
          <div className={styles.container}>
            {children}
          </div>
        </div>
    </div>
  )
}

export default Layout