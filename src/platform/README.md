# platform

Adapters to Tauri and the OS: the git bridge client, dialogs, the persistent store.

- The only frontend layer that imports `@tauri-apps/*`.
- May import `core`. Keep adapters thin and put logic in `core`.
