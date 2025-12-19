/* global document, KeyboardEvent */
import {useEffect} from "react";

export const enum HotKeyModifierEnum {
    alt = "alt",
    ctrl = "ctrl",
    shift = "shift",
}

function getIsInputNode(element: EventTarget): boolean {
    if ("nodeName" in element) {
        return element.nodeName === "INPUT";
    }

    return false;
}

function hasInputInPath(path: Array<EventTarget>): boolean {
    return path.some(getIsInputNode);
}

export interface UseHotKeyArgumentType {
    modifierList?: Array<HotKeyModifierEnum>;
    code: string;
    handleHotKey: () => unknown;
    isShowLog?: boolean;
    isDisableWhenInputActive?: boolean;
    isEnable?: boolean;
}

export function useHotKey(data: UseHotKeyArgumentType): undefined {
    const {
        isEnable = true,
        isDisableWhenInputActive = false,
        isShowLog = false,
        handleHotKey,
        code,
        modifierList = [],
    } = data;

    const hasAlt = modifierList.includes(HotKeyModifierEnum.alt);
    const hasCtrl = modifierList.includes(HotKeyModifierEnum.ctrl);
    const hasShift = modifierList.includes(HotKeyModifierEnum.shift);

    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent): undefined {
            if (isShowLog) {
                console.log("useHotKey:", {code: evt.code, evt});
            }

            if (isDisableWhenInputActive && hasInputInPath(evt.composedPath())) {
                return;
            }

            const isModificationKeysMatched =
                evt.altKey === hasAlt && evt.ctrlKey === hasCtrl && evt.shiftKey === hasShift;

            const isKeyMatched = code === evt.code;

            if (isModificationKeysMatched && isKeyMatched) {
                evt.preventDefault();
                handleHotKey();
            }
        }

        if (isEnable) {
            document.body.addEventListener("keydown", handleBodyOnKeyPress, false);
        }

        return (): void => {
            document.body.removeEventListener("keydown", handleBodyOnKeyPress, false);
        };
    }, [hasAlt, hasCtrl, hasShift, code, handleHotKey, isShowLog, isDisableWhenInputActive, isEnable]);
}
