import Head from 'next/head';
import { useRouter } from 'next/router';
import { authorName } from '@/lib/constant'

type HeadProps = {
    readonly title?: string
    readonly thumbnailUrl?: string
    readonly description?: string
};

const CommonHead = ({ title, thumbnailUrl, description }: HeadProps): JSX.Element => {
    const domainName = "http://klikki-lab.com";
    const { pathname } = useRouter();
    const _title = title ? `${title} - ${authorName}` : authorName;
    const _thumbnailUrl = thumbnailUrl ?? `${domainName}/images/profile.png`;
    const _description = description ?? `${authorName}'s website`;
    return (
        <Head>
            <title>{_title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta property="og:title" content={_title} />
            <meta property="og:image" content={_thumbnailUrl} />
            <meta property="og:description" content={_description} />
            <meta property="og:url" content={`${domainName}${pathname}`} />
            <meta property="og:site_name" content={authorName} />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </Head>
    )
};

export default CommonHead;