/* eslint-disable no-param-reassign, id-length, no-plusplus, sort-keys, sonarjs/no-nested-assignment */
export type EasingFunctionType = (amount: number) => number;

export type EasingFunctionGroupType = Readonly<Record<"in" | "out" | "inOut", EasingFunctionType>>;

type EasingFunctionNameType =
    | "linear"
    | "quadratic"
    | "cubic"
    | "quartic"
    | "quintic"
    | "sinusoidal"
    | "exponential"
    | "circular"
    | "elastic"
    | "back"
    | "bounce";

export const easingFunction: Readonly<Record<EasingFunctionNameType, EasingFunctionGroupType>> = {
    linear: {
        in(amount: number): number {
            return amount;
        },
        out(amount: number): number {
            return amount;
        },
        inOut(amount: number): number {
            return amount;
        },
    },

    quadratic: {
        in(amount: number): number {
            return amount * amount;
        },
        out(amount: number): number {
            return amount * (2 - amount);
        },
        inOut(amount: number): number {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }

            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },

    cubic: {
        in(amount: number): number {
            return amount * amount * amount;
        },
        out(amount: number): number {
            return --amount * amount * amount + 1;
        },
        inOut(amount: number): number {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },

    quartic: {
        in(amount: number): number {
            return amount * amount * amount * amount;
        },
        out(amount: number): number {
            return 1 - --amount * amount * amount * amount;
        },
        inOut(amount: number): number {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }

            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },

    quintic: {
        in(amount: number): number {
            return amount * amount * amount * amount * amount;
        },
        out(amount: number): number {
            return --amount * amount * amount * amount * amount + 1;
        },
        inOut(amount: number): number {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }

            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },

    sinusoidal: {
        in(amount: number): number {
            return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2);
        },
        out(amount: number): number {
            return Math.sin((amount * Math.PI) / 2);
        },
        inOut(amount: number): number {
            return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
        },
    },

    exponential: {
        in(amount: number): number {
            return amount === 0 ? 0 : 1024 ** (amount - 1);
        },
        out(amount: number): number {
            return amount === 1 ? 1 : 1 - 2 ** (-10 * amount);
        },
        inOut(amount: number): number {
            if (amount === 0) {
                return 0;
            }

            if (amount === 1) {
                return 1;
            }

            if ((amount *= 2) < 1) {
                return 0.5 * 1024 ** (amount - 1);
            }

            return 0.5 * (-(2 ** (-10 * (amount - 1))) + 2);
        },
    },

    circular: {
        in(amount: number): number {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        out(amount: number): number {
            return Math.sqrt(1 - --amount * amount);
        },
        inOut(amount: number): number {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },

    elastic: {
        in(amount: number): number {
            if (amount === 0) {
                return 0;
            }

            if (amount === 1) {
                return 1;
            }

            return -(2 ** (10 * (amount - 1))) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        out(amount: number): number {
            if (amount === 0) {
                return 0;
            }

            if (amount === 1) {
                return 1;
            }
            return 2 ** (-10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        inOut(amount: number): number {
            if (amount === 0) {
                return 0;
            }

            if (amount === 1) {
                return 1;
            }

            amount *= 2;

            if (amount < 1) {
                return -0.5 * 2 ** (10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }

            return 0.5 * 2 ** (-10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },

    back: {
        in(amount: number): number {
            const s = 1.70158;
            return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
        },
        out(amount: number): number {
            const s = 1.70158;
            return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
        },
        inOut(amount: number): number {
            const s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },

    bounce: {
        in(amount: number): number {
            return 1 - easingFunction.bounce.out(1 - amount);
        },
        out(amount: number): number {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }

            return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
        },
        inOut(amount: number): number {
            if (amount < 0.5) {
                return easingFunction.bounce.in(amount * 2) * 0.5;
            }
            return easingFunction.bounce.out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};
