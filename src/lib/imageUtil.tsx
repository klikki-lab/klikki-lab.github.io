const DEFAULT_IMAGE_WIDTH = 96;
const DEFAULT_IMAGE_HEIGHT = 96;

type Name = {
    readonly name: string;
};

type Size = {
    readonly width?: number;
    readonly height?: number;
};

type Raster = Name & Size & {
    readonly src: string;
};

type Vector = Name & Size & {
    readonly path: string;
    readonly color: string;
    readonly viewBox: string;
};

export type ImageFormatProps = Raster | Vector;

const isRasterFormat = (format: ImageFormatProps): format is Raster => {
    const raster = format as Raster;
    return typeof raster?.src === "string";
};

export const createImageElement = (props: ImageFormatProps) => {
    const width = props.width ?? DEFAULT_IMAGE_WIDTH;
    const height = props.height ?? DEFAULT_IMAGE_HEIGHT;

    if (isRasterFormat(props)) {
        return (
            <img
                className='d-block mx-auto'
                src={props.src}
                width={width}
                height={height}
                alt={props.name} />
        );
    }
    
    const vector = props as Vector;
    return (
        <svg
            className='d-block mx-auto'
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={vector.viewBox}
            fill={vector.color}>
            <path d={vector.path} />
        </svg>
    );
};