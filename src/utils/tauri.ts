import { Webview, WebviewOptions } from "@tauri-apps/api/webview";
import { Window as TauriWindow } from "@tauri-apps/api/window";

type OpenInNewTabOrNewWindowProps = {
    window: Window;
    url: string;
};

export const openInNewTabOrNewWindow = ({window, url}: OpenInNewTabOrNewWindowProps) => {
    const isInApp = !!window.__TAURI__;

    if (isInApp) {
        const appWindow = new TauriWindow('uniqueLabel');
        const webview = new Webview(appWindow, 'theUniqueLabel', {
            url: 'index.html',
          } as WebviewOptions);
          webview.once('tauri://created', function () {
            console.log('Window opened');
           });
    } else {
        window
            .open(url, '_blank')
            ?.focus();
    }

};