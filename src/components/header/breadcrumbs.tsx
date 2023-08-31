import Link from 'next/link';
import { useRouter } from 'next/router';
import utilStyles from '@/styles/utils.module.css';
import styles from './header.module.css';

const capitalizeFirstLetter = (text: string): string =>
    text.length === 0 ? text : text[0].toUpperCase() + text.slice(1);

const convertHyphenSeparated = (text: string): string => {
    const words = text.split('-');
    const capitalizedWords = words.map((word, index) => {
        if (index === 0)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
};

const convertUnderscoreSeparated = (text: string): string => {
    const words = text.split('_');
    const capitalizedWords = words.map((word, index) => {
        if (index === 0)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join('');
};

const formatBreadcrumb = (pathName: string): string => {
    if (pathName.includes('-')) {
        pathName = convertHyphenSeparated(pathName);
    }
    if (pathName.includes('_')) {
        return convertUnderscoreSeparated(pathName);
    }
    return capitalizeFirstLetter(pathName);
}

const Breadcrumbs = (): JSX.Element => {
    const { pathname } = useRouter();
    if (!pathname || pathname === '/' || pathname === '/ja') return (<></>);

    const paths = pathname.split('/');
    let route = '';
    return (
        <nav aria-label="breadcrumbs">
            <ul className={`${utilStyles.noneStyleList} ${styles.breadcrumb}`}>
                {paths.map((path, index) => {
                    if (index === 0 && pathname.includes('ja')) {
                        route += '/';
                        return;
                    }
                    const pathName = !path || path === 'ja' ? "home" : path;
                    const breadcrumb = formatBreadcrumb(pathName);
                    if (index === paths.length - 1) {
                        return (<li key={breadcrumb}>{breadcrumb}</li>);
                    }
                    route += path + '/';
                    return (<li key={breadcrumb}><Link href={route}>{breadcrumb}</Link></li>);
                })}
            </ul>
        </nav>
    );
};
export default Breadcrumbs;