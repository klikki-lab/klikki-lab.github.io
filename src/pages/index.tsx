import React, { ReactElement } from 'react';
import Link from 'next/link';
import CommonLayout from '@/components/layout/commonLayout';
import { NextPageWithLayout } from '@/pages//_app';
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import Products from './products';
import utilStyles from '@/styles/utils.module.css';
import { authorName } from '@/lib/constant';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <TitleHeader props={{ name: authorName, src: '/images/profile.png' }} />
      <p className="text-center">Hi there!</p>
      <main>
        <h2 className={utilStyles.headingLg}>
          <Link href='/products'>Porducts</Link>
        </h2>
        <Products />
      </main>
    </>
  )
};

Home.getLayout = (page: ReactElement): React.ReactNode => {
  return (
    <>
      <CommonHead />
      <CommonLayout>
        {page}
      </CommonLayout>

      <CommonFooter props={[
        { name: 'Contact', url: 'contact' },
        // { name: t("webSitePolicy.title"), url: t("webSitePolicy.url") }
      ]} />
    </>
  )
};

export default Home;