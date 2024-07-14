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

const appName = 'Sakura Heaven';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>How to play</h1>
            <p>
                Destroy the meteorite by firing a missile at the location you click (touch).
                There are 3 bases, and 10 missiles are deployed at each base.
                If a meteorite hits your base, it will be destroyed.
                If all bases are destroyed or the missiles run out, you will not be able to take action until the next wave.
                At the end of the wave, the destroyed base will be repaired and missiles will be replenished.
            </p>

            <h1 className={utilStyles.headingLg}>Basic techniques</h1>
            <ul>
                <li>The basic idea is to predict the trajectory of the meteorite and shoot the missile slightly ahead (deviation shooting).</li>
                <li>The missile explodes at the point of impact, creating a blast wave. It is easier to detonate an meteorite with a blast wave than to hit it directly with a missile.</li>
                <li>You can aim for a high score by involving a lot of meteorites with one blast.</li>
                <li>Killing a UFO increases missile speed and blast radius.</li>
            </ul>

            <h1 className={utilStyles.headingLg}>Advanced technique</h1>
            <ul>
                <li>If you hit a meteorite directly with a missile, the blast range will be wider than normal.</li>
            </ul>

            <h1 className={utilStyles.headingLg}>Music/sound effects</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/c'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/meteor_panic'}>
                https://github.com/klikki-lab/meteor_panic
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} is a Missile Command style game`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/sakura-heaven.png`
            }} />

            <div className={styles.note}>
                <p><strong>🔊 When you start the game, a audio will be played.</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/sakura-heaven/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;