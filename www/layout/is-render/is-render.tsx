import type {ReactNode} from "react";

interface PropsType {
    readonly children?: ReactNode;
    readonly isRender: boolean;
}

// eslint-disable-next-line sonarjs/function-return-type
export function IsRender(props: PropsType): ReactNode {
    const {isRender, children} = props;

    return isRender ? children : null;
}
