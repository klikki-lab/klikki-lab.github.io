import Head from 'next/head';
import { useRouter } from 'next/router';
import { authorName } from '@/lib/constant';
import { domain } from '@/lib/constant';

type HeadProps = {
    readonly title?: string
    readonly thumbnailUrl?: string
    readonly description?: string
};

const CommonHead = ({ title, thumbnailUrl, description }: HeadProps): JSX.Element => {
    const { pathname } = useRouter();
    const absolutePath = `${domain}${!pathname || pathname === '/' ? "" : pathname}`;
    const _title = title ? `${title} - ${authorName}` : authorName;
    const _imagelUrl = thumbnailUrl ?? `${domain}/images/profile.png`;
    const _description = description ?? `Hi there! Welcome to ${authorName}'s website!`;
    return (
        <Head>
            <title>{_title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel="canonical" href={absolutePath} />
            <meta name='author' content={authorName}></meta>
            <meta name='description' content={_description} />
            <meta property="og:title" content={_title} />
            <meta property="og:image" content={_imagelUrl} />
            <meta property="og:description" content={_description} />
            <meta property="og:url" content={absolutePath} />
            <meta property="og:site_name" content={authorName} />
        </Head>
    )
};

export default CommonHead;