import Link from 'next/link';
import { Platforms } from './platforms';
import { ImageFormatProps, createImageElement } from '@/lib/imageUtil';

export type ProductProps = ImageFormatProps & {
    readonly platform: Platforms;
    readonly locale?: string;
};

export const Product = ({ props }: { props: ProductProps }) => {
    const lang = props.locale ? '/ja/' : '/';
    const directory = `${lang}products`;
    const imageSize = 96;
    return (
        <Link href={`${directory}/${props.platform}/${props.name?.toLowerCase()}`}>
            {createImageElement({ ...props, width: props.width ?? imageSize, height: props.height ?? imageSize })}
            <div className='text-center'>{props.name.replaceAll('_', '')}</div>
        </Link>
    );
}