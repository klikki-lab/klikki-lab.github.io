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
    const _title = title ? `${title} - ${authorName}` : authorName;
    const _thumbnailUrl = thumbnailUrl ?? `${domain}/images/profile.png`;
    const _description = description ?? `Hi there! Welcome to ${authorName}'s website!`;
    return (
        <Head>
            <title>{_title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='author' content={authorName}></meta>
            <meta name='description' content={_description} />
            <meta property="og:title" content={_title} />
            <meta property="og:image" content={_thumbnailUrl} />
            <meta property="og:description" content={_description} />
            <meta property="og:url" content={`${domain}${pathname}`} />
            <meta property="og:site_name" content={authorName} />
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <link rel="canonical" href={`${domain}${pathname}`} />
        </Head>
    )
};

export default CommonHead;