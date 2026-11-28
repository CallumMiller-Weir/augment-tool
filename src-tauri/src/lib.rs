//! Tauri entry point. Keep the Rust side deliberately thin: it hosts the
//! window and exposes small, OS-level commands. Domain logic lives in
//! `src/core` (TypeScript).

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
