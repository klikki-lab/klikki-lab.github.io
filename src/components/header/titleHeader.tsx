import { ImageFormatProps, createImageElement } from '@/lib/imageUtil';
import utilStyles from '@/styles/utils.module.css';
import styles from '@/components/layout/layout.module.css';

const IMAGE_SIZE = 128;

export const TitleHeader = ({ props }: { props: ImageFormatProps }): JSX.Element => {
    return (
        <div className={styles.title}>
            {createImageElement({ ...props, width: props.width ?? IMAGE_SIZE, height: props.height ?? IMAGE_SIZE })}
            <h1 className={utilStyles.heading2Xl}>{props.name}</h1>
        </div>
    )
};