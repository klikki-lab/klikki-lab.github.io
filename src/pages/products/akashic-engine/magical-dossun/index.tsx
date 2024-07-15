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

const appName = 'Magical Dossun';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>How to play</h1>
            <p>
                A bunny egg will jump to the position you click.
                The impact of the bunny egg landing will gradually crack the shells of nearby eggs.
            </p>

            <h1 className={utilStyles.headingLg}>Basic Techniques</h1>
            <ul>
                <li>You will get bonus points every time you break the same egg. </li>
                <li>You will get bonus points if you break multiple eggs at the same time. </li>
                <li>Rare eggs that appear very rarely drop carrots, which when picked up will power up your Bunny Egg for a certain period of time. </li>
            </ul>

            <h1 className={utilStyles.headingLg}>Music/Sound Effects</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/easter_bunny'}>
                https://github.com/klikki-lab/easter_bunny
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={
                    `${appName} is an HTML game using the Akashic Engine.
                    Control the Bunny Egg and crack as many eggs as you can!`
                }
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/magical-dossun.png`
            }} />

            <div className={styles.note}>
                <p><strong>🔊 When you start the game, a audio will be played.</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/magical-dossun/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;