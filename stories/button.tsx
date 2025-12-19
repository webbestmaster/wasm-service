import "./button.css";

import type {JSX} from "react";

interface ButtonProps {
    /**
     * What background color to use
     */
    readonly backgroundColor?: string;
    /**
     * Button contents
     */
    readonly label: string;
    /**
     * Is this the principal call to action on the page?
     */
    readonly primary?: boolean;
    /**
     * How large should the button be?
     */
    readonly size?: "large" | "medium" | "small";
}

// Primary UI component for user interaction
export function Button({primary = false, size = "medium", backgroundColor, label}: ButtonProps): JSX.Element {
    const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";

    return (
        <button
            className={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
            style={{backgroundColor}}
            type="button"
        >
            {label}
        </button>
    );
}
