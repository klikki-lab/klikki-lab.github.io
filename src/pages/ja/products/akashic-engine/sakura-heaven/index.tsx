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

const appName = 'サクラヘヴン';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>遊び方</h1>
            <p>
                リズムに合わせてタイミングよくクリック。PC は 'Z' キーでも可。
                目押しはとても難しいです。リズムにノッてクリックしよう！
            </p>

            <h1 className={utilStyles.headingLg}>既知の問題</h1>
            <p>
                プレイヤーの環境によってはまともにゲームが遊べないレベルの音ズレが発生するようです。
                どのような環境で発生するかは判明していません。
            </p>

            <h1 className={utilStyles.headingLg}>音楽・効果音</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/c'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>ソースコード</h1>
            <p>{appName} は GitHub でソースコードを公開中です。</p>
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
                description={`${appName} は Akashic Engine を使用したニコ生ゲームです。`}
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
                <p><strong>🔊 ゲームを開始すると音声が流れます。</strong></p>
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