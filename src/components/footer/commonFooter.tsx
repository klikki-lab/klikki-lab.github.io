import Link from 'next/link';
import { Socials } from './socials';
import styles from '@/components/layout/layout.module.css';
import utilStyles from '@/styles/utils.module.css';
import { authorName } from '@/lib/constant';

export type FooterItemProps = {
    name: string,
    url: string
};

export const CommonFooter = ({ props }: { props?: FooterItemProps[] }): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <nav className={styles.footer_nav}>
                <ul className={`${utilStyles.noneStyleList}`}>
                    {props?.map(prop => (
                        <li key={prop.name}>
                            <Link href={prop.url}>{prop.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {createAuthorInfo(authorName)}
        </footer>
    );
};

const createAuthorInfo = (authorName: string) => {
    return (
        <>
            <nav className={styles.footer_sosials}>
                <Socials />
            </nav>
            <div className={styles.footer_author}>
                <p className={styles.author}>&copy; {authorName}</p>
            </div>
        </>
    )
};