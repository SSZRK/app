import {openInNewTabOrNewWindow, OpenInNewTabOrNewWindowProps} from "../../utils/tauri.ts";
import {Window as TauriWindow, WindowOptions} from "@tauri-apps/api/window";

export default function AboutCap() {
    return (
        <a onClick={() => openInNewTabOrNewWindow({
            window, url: '/about',
            windowLabel: 'about',
            windowOptions: {
                title: 'O aplikacji',
                center: true,
                focus: true,
                alwaysOnTop: true,
                minimizable: false,
                height: 700,
                width: 800,
                parent: TauriWindow.getCurrent(),
            } as WindowOptions
        } as OpenInNewTabOrNewWindowProps)}
           className="flex absolute right-0 bottom-0 cursor-pointer h-32 m-5 opacity-50 hover:opacity-80 transition-opacity duration-100">
            <img src="/icon-full.png" alt="logo"/>
        </a>
    );
}