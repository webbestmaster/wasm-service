import type {EasingFunctionType} from "./easing-function";

type AnimateInputType = Record<"periodMs" | "begin" | "end", number> & {
    easing: EasingFunctionType;
    onFinish?: () => void;
};
export type AnimateCallbackDataType = Record<"progressMs" | "progress" | "deltaValue" | "value", number>;
export type AnimateCallbackType = (data: AnimateCallbackDataType) => void;

interface AnimateControllerType {
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (progress: number) => void;
}

export function animate(data: AnimateInputType, callback: AnimateCallbackType): AnimateControllerType {
    const {end, periodMs, begin, easing, onFinish} = data;
    let startTime = 0;
    let isPaused = true;
    let progressMs = 0;

    function seek(progressToSeek: number, isUpdate: boolean): void {
        if (isUpdate) {
            progressMs = periodMs * progressToSeek;
            startTime = Date.now() - progressMs;
        }

        const deltaValue = (end - begin) * easing(progressToSeek);
        const value = begin + deltaValue;

        callback({
            deltaValue,
            progress: progressToSeek,
            progressMs,
            value,
        });
    }

    function innerAnimation(): void {
        if (isPaused) {
            return;
        }

        progressMs = Date.now() - startTime;

        const progress = progressMs / periodMs;

        if (progress < 1) {
            seek(progress, false);
            requestAnimationFrame(innerAnimation);
        } else {
            callback({
                deltaValue: end - begin,
                progress: 1,
                progressMs: periodMs,
                value: end,
            });

            onFinish?.();
        }
    }

    const controller: AnimateControllerType = {
        pause: () => {
            isPaused = true;
        },
        play: () => {
            if (!isPaused) {
                return;
            }

            isPaused = false;

            startTime = Date.now() - progressMs;

            innerAnimation();
        },
        seek: (progress: number) => {
            seek(progress, true);
        },
        stop: () => {
            isPaused = true;
            seek(0, true);
        },
    };

    return controller;
}

/**
 Example
 const animation = animate(
 {
 begin: 0,
 easing: Easing.Linear.In,
 end: 1,
 onFinish: () => {
 console.log("done");
 },
 periodMs: 3e3,
 },
 (data: AnimateCallbackDataType) => {
 console.log("".padStart(data.value * 200, "_"));
 }
 );

 animation.play();

 setTimeout(() => {
 animation.seek(0.1);
 }, 1e3);

 setTimeout(() => {
 animation.pause();
 }, 1e3);

 setTimeout(() => {
 animation.play();
 }, 2e3);
 */
