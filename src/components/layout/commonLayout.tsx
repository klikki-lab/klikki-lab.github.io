import Breadcrumbs from '@/components/header/breadcrumbs';
import { CommonHeader } from '@/components/header/commonHeader'
import styles from './layout.module.css'

type Children = {
  readonly children: React.ReactNode
};

const CommonLayout = ({ children }: Children): JSX.Element => {
  return (
    <>
      <CommonHeader />
      <div className={styles.container}>
        <Breadcrumbs />
        {children}
      </div>
    </>
  )
};

export default CommonLayout;