import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import utilStyles from '@/styles/utils.module.css'
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import Link from 'next/link';
import styles from '@/components/layout/layout.module.css';
import { CommonHeader } from '@/components/header/commonHeader';
import Breadcrumbs from '@/components/header/breadcrumbs';

const appName = 'Demonstration';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>Slider</h1>
            <ol>
                <li>Speed</li>
                <li>Size</li>
                <li>Number of objects</li>
                <li>Object transparency</li>
                <li>Background transparency</li>
            </ol>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/demonstration'}>
                https://github.com/klikki-lab/demonstration
            </Link>
        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} is a curved animation using the Akashic Engine.`}
                image='akashic-engine/demonstration.png'
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/demonstration.png`
            }} />

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/demonstration/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;