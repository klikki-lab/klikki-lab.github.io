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

const appName = 'マジカルどっすん';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>遊び方</h1>
            <p>
                クリックした位置にバニーエッグがジャンプします。
                ドッスンした衝撃で近くにいるエッグのカラが少しずつ割れていきます。
            </p>

            <h1 className={utilStyles.headingLg}>基本テクニック</h1>
            <ul>
                <li>同じエッグをドッスンするたびにボーナス点があります。</li>
                <li>複数のエッグをドッスンするとボーナス点があります。</li>
                <li>ごくまれに出現するレアエッグが落とすニンジンを取ると一定時間バニーがパワーアップします。</li>
            </ul>

            <h1 className={utilStyles.headingLg}>音楽・効果音</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>ソースコード</h1>
            <p>{appName} は GitHub でソースコードを公開中です。</p>
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
                description={`${appName} は Akashic Engine を使用した HTML ゲームです。`}
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
                <p><strong>🔊 ゲームを開始すると音声が流れます。</strong></p>
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