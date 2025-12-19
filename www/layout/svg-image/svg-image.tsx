import type {JSX} from "react";

interface PropsType {
    readonly className: string;
    readonly imageId: string;
}

export function SvgImage(props: PropsType): JSX.Element {
    const {className: cssClassName, imageId} = props;

    return (
        <svg className={cssClassName}>
            <use xlinkHref={imageId} />
        </svg>
    );
}
