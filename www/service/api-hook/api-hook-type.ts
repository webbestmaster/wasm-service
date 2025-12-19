export interface UseHookType<HookData> {
    isInProgress: boolean;
    processError: Error | null;
    reset: () => void;
    result: HookData | null;
}

export interface UseRefreshApiHookType {
    refresh: () => void;
    refreshId: string;
}
