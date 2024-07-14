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

const appName = 'Bento Challenge';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>How to play</h1>
            <p>
                Sneak in some lunch before the teacher notices!
                If you get caught, you'll get a lecture! Click the screen to start eating.
                Be careful, as the teacher will occasionally turn around!
            </p>

            <h1 className={utilStyles.headingLg}>Basic Techniques</h1>
            <ul>
                <li>The teacher's glasses always slip right before they turn towards the students. Don't miss it! But be aware, there are occasional fake-outs!</li>
                <li>When the teacher turns back to the blackboard, they sometimes fake it. Be careful!</li>
            </ul>

            <h1 className={utilStyles.headingLg}>Music/sound effects</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/bento_challenge'}>
                https://github.com/klikki-lab/bento_challenge
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} game is a game based on a traditional style used in Japanese schools (just kidding).`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/hayaben-challenge.png`
            }} />

            <div className={styles.note}>
                <p><strong>🔊 When you start the game, a audio will be played.</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/hayaben-challenge/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;