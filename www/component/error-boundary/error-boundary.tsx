import {Component, type ReactNode} from "react";

interface PropsType {
    readonly children: ReactNode;
    readonly errorFallBack: ReactNode;
}

interface StateType {
    hasError: boolean;
}

// eslint-disable-next-line react/require-optimization
export class ErrorBoundary extends Component<PropsType, StateType> {
    public constructor(props: PropsType) {
        super(props);

        this.state = {hasError: false};
    }

    public override componentDidCatch(error: Error, errorInfo: unknown): void {
        console.log("[ERROR]:", error);
        console.log("[ERROR-INFO]:", errorInfo);

        // eslint-disable-next-line react/no-set-state
        this.setState({hasError: true});
    }

    // eslint-disable-next-line sonarjs/function-return-type
    public override render(): ReactNode {
        const {state, props} = this;
        const {hasError} = state;

        const {children, errorFallBack} = props;

        return hasError ? errorFallBack : children;
    }
}
