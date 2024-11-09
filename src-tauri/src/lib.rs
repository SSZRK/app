#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::menu::{Menu, MenuBuilder, MenuItem, Submenu, SubmenuBuilder};
use tauri::Emitter;
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let file_menu = SubmenuBuilder::new(app, "Plik")
                .text("open", "Open")
                .text("save", "Save")
                .text("go-to", "Idź do")
                .text("admin", "Panel administracyjny")
                .text("quit", "Zamknij")
                .build()?;

            let menu = MenuBuilder::new(app).items(&[&file_menu]).build()?;

            app.set_menu(menu)?;

            app.on_menu_event(move |app_handle: &tauri::AppHandle, event| {
                match event.id().0.as_str() {
                    "open" => {
                        println!("open event");
                    }
                    "admin" => {
                        app_handle
                            .emit("open-admin", "")
                            .expect("failed to emit event");
                    }
                    "quit" => {
                        let answer = app_handle
                            .dialog()
                            .message("Czy na pewno chcesz zamknąć aplikację?")
                            .title("Zamknij aplikację")
                            .buttons(MessageDialogButtons::OkCancelCustom(
                                "Tak".to_string(),
                                "Nie".to_string(),
                            ))
                            .blocking_show();
                        if answer {
                            app_handle.exit(0);
                        }
                    }
                    _ => {
                        println!("unexpected menu event");
                    }
                }
            });

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
