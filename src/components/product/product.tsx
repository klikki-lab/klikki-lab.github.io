import Link from 'next/link';
import { Platforms } from './platforms';
import { ImageFormatProps, createImageElement } from '@/lib/imageUtil';

export type ProductProps = ImageFormatProps & {
    readonly platform: Platforms;
    readonly url?: string;
    readonly locale?: string;
};

export const Product = ({ props }: { props: ProductProps }) => {
    const lang = props.locale ? '/ja/' : '/';
    const directory = `${lang}products`;
    const url = props.url ? props.url : props.name?.toLowerCase();
    const imageSize = 96;
    return (
        <Link href={`${directory}/${props.platform}/${url}`}>
            {createImageElement({ ...props, width: props.width ?? imageSize, height: props.height ?? imageSize })}
            <div className='text-center'>{props.name.replaceAll('_', '')}</div>
        </Link>
    );
}