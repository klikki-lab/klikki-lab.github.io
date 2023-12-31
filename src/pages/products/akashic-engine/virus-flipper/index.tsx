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

const appName = 'Virus Flipper';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>How to play</h1>
            <p>
                Click to make the floor white; release to make it black.
                Repel the virus by inverting the color of the floor and the color of the virus!
            </p>

            <h1 className={utilStyles.headingLg}>Game mode</h1>
            <ul>
                <li>Normal - Compete for score in 60 seconds</li>
                <li>Hardcore - Endless mode with one mistake and the game is over</li>
            </ul>

            <h1 className={utilStyles.headingLg}>Music/sound effects</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/virus_flipper'}>
                https://github.com/klikki-lab/virus_flipper
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} is a game that repels viruses`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/virus-flipper.png`,
                width: 96,
                height: 96,
            }} />

            <div className={styles.note}>
                <p><strong>🔊 The audio will play when you start the game.</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/virus-flipper/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;