import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import utilStyles from '@/styles/utils.module.css'
import { TitleHeader } from '@/components/header/titleHeader';
import CommonLayout from '@/components/layout/commonLayout';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import Link from 'next/link';

const appName = 'Linkify';

const Linkify: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{
                name: appName,
                path: 'M468 816q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480 416q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650 825l-50 151-120-400 400 120-151 50 171 171-79 79Z',
                color: '#2196F3',
                viewBox: '0 96 960 960'
            }} />
            <main>
                <h1 className={utilStyles.headingLg}>About this extension</h1>
                <p>
                    Double-clicking an unlinked URL string takes you to the page at that URL.
                    As an example, the following URL strings are supported:
                </p>
                <ul>
                    <li>{'https://www.google.com'}</li>
                    <li>{'ttps://www.google.com'}</li>
                    <li>{'ｈｔｔｐｓ：／／ｗｗｗ．ｇｏｏｇｌｅ．ｃｏｍ'}</li>
                </ul>

                <h1 className={utilStyles.headingLg}>Download</h1>
                <p>Linkify is releasing the source code on GitHub.</p>
                <Link href={'https://github.com/klikki-lab/linkify'}>https://github.com/klikki-lab/linkify</Link>
            </main>
        </>
    )
};

Linkify.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title={appName} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter />
            {/* <CommonFooter props={[
                { name: `${t('name', { ns: Locales.LINKIFY })} ${t('privacyPolicy')}`, url: './linkify/privacy-policy' },
            ]} /> */}
        </>
    )
};

export default Linkify;