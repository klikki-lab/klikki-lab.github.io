import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './header.module.css'
import LocaleButton from './localeButton';
import { authorName } from '@/lib/constant';

export const CommonHeader = (): JSX.Element => {
    const { asPath } = useRouter();
    const paths = asPath.split('/');
    const isTopPage = paths.length <= 2 && (paths[1] === '' || paths[1] === 'ja');
    const isJapanese = asPath.startsWith('/ja');
    const directory = isJapanese ? '/ja' : '/';
    const title = isTopPage ? authorName : isJapanese ? 'ホームに戻る' : 'Back to home';
    const size = 32;
    return (
        <header className={styles.header}>
            <nav className={styles.brand} aria-label='brand'>
                <Link href={directory} title={title}>
                    <img
                        src="/images/profile.png"
                        width={size}
                        height={size}
                        alt="author badge"
                    />
                    <span>{authorName}</span>
                </Link>
            </nav>

            <LocaleButton />
        </header >
    )
};