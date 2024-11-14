import {WebviewOptions} from "@tauri-apps/api/webview";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";

export type OpenInNewTabOrNewWindowProps = {
    window: Window;
    windowLabel: string;
    windowOptions?: WebviewOptions;
    url: string;
};

export const openInNewTabOrNewWindow = async ({
                                                  window,
                                                  url,
                                                  windowLabel,
                                                  windowOptions
                                              }: OpenInNewTabOrNewWindowProps) => {
    const isInApp = !!window.__TAURI_INTERNALS__;

    if (isInApp) {
        const webviewWindow = await new WebviewWindow(windowLabel, {
            ...windowOptions,
            url,
        } as WebviewOptions);
        console.log(webviewWindow);
    } else {
        window
            .open(url, '_blank')
            ?.focus();
    }

};