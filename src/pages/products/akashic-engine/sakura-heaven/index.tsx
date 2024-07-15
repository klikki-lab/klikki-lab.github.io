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
                Simply click in time with the rhythm.
                On PC, you can also use the Z key. Timing your clicks by sight is very challenging.
                Get into the rhythm and click away!
            </p>

            <h1 className={utilStyles.headingLg}>Known Issues</h1>
            <p>
                It seems that there can be significant audio lag, making the game unplayable for some players.
                It is not yet known under which conditions this issue occurs.
            </p>

            <h1 className={utilStyles.headingLg}>Music/sound effects</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>Source code</h1>
            <p>The source code is now available on GitHub.</p>
            <Link href={'https://github.com/klikki-lab/sakura_heaven'}>
                https://github.com/klikki-lab/sakura_heaven
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
                    `${appName} is a rhythm game. Here's how to play: simply click in time with the rhythm. On PC, you can also use the Z key. Timing your clicks by sight is very challenging. Get into the rhythm and click away!`
                }
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