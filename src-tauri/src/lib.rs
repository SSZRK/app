use std::sync::Mutex;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::menu::{Menu, MenuBuilder, MenuItem, Submenu, SubmenuBuilder};
use tauri::{AppHandle, Emitter, Manager, State};
use tauri::async_runtime::spawn;
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};
use tauri_plugin_updater::UpdaterExt;
use tokio::time::{sleep, Duration};

struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .manage(Mutex::new(SetupState {
            frontend_task: true,
            backend_task: false,
        }))
        .setup(|app| {
            let file_menu = SubmenuBuilder::new(app, "Plik")
                .text("open", "Open")
                .text("save", "Save")
                .text("go-to", "Idź do")
                .text("admin", "Panel administracyjny")
                .text("update", "Sprawdź aktualizacje")
                .text("quit", "Zamknij")
                .build()?;

            let menu = MenuBuilder::new(app).items(&[&file_menu]).build()?;

            app.set_menu(menu)?;

            app.on_menu_event(move |app_handle: &AppHandle, event| {
                match event.id().0.as_str() {
                    "open" => {
                        println!("open event");
                    }
                    "admin" => {
                        app_handle
                            .emit("open-admin", "")
                            .expect("failed to emit event");
                    }
                    "update" => {
                        let handle = app_handle.clone();
                        spawn(async move {
                            update(handle).await.unwrap();
                        });
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

            spawn(setup(app.handle().clone()));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn update(app: AppHandle) -> tauri_plugin_updater::Result<()> {
    if let Some(update) = app.updater()?.check().await? {
        let mut downloaded = 0;

        update
            .download_and_install(
                |chunk_length, content_length| {
                    downloaded += chunk_length;
                    println!("downloaded {downloaded} from {content_length:?}");
                },
                || {
                    println!("download finished");
                },
            )
            .await?;

        println!("update installed");
        app.restart();
    }

    Ok(())
}

#[tauri::command]
async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("invalid task completed!"),
    }
    if state_lock.backend_task && state_lock.frontend_task {
        let splash_window = app.get_webview_window("splashscreen").unwrap();
        let main_window = app.get_webview_window("main").unwrap();
        splash_window.close().unwrap();
        main_window.show().unwrap();
    }
    Ok(())
}

async fn setup(app: AppHandle) -> Result<(), ()> {
    let handle = app.clone();
    spawn(async move {
        update(handle).await.unwrap();
    }).await.unwrap();


    println!("Performing really heavy backend setup task...");
    sleep(Duration::from_secs(3)).await;
    println!("Backend setup task completed!");
    set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    )
        .await?;
    Ok(())
}