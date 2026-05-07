/* tslint:disable */
/* eslint-disable */

/**
 * JS → Rust entry point.  JS side passes a single UTF-8 JSON
 * message of the form `{"method": "...", "params": {...}}` with
 * the request id.  `wasm-bindgen` copies the `Uint8Array` into
 * wasm for the duration of this call; we don't hold on to it.
 *
 * The reply is delivered asynchronously (once the game loop
 * drains the queue) via [`rh_rpc_resolve`].  A decode-time error
 * resolves immediately with status 400.
 *
 * The reply id is opaque to Rust — JS is expected to use a fresh
 * id per outstanding request.
 */
export function rh_rpc_enqueue(id: number, json: Uint8Array): void;

/**
 * JS entry point.  Hand in the contents of `Data/datadir.bin` (the
 * bitcode-serialised + zstd-compressed asset bundle the converter
 * emits) — Rust decodes it, installs it as the asset bundle, then
 * runs the game under winit's web backend.  Returns immediately on
 * success; the game itself is driven by `requestAnimationFrame`.
 */
export function wasm_boot(datadir_bin: Uint8Array): void;

/**
 * Register one host-preloaded asset before `wasm_boot` starts the
 * game loop.  The browser loader uses this for large per-level files
 * kept outside `datadir.bin` while Rust keeps a synchronous read API.
 */
export function wasm_preload_asset(path: string, bytes: Uint8Array): void;

/**
 * Wasm boot — installed at module-instantiation time by wasm-bindgen.
 * Just sets up panic + tracing.  The JS host calls [`wasm_boot`]
 * after fetching the datadir bundle.
 */
export function wasm_start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly wasm_boot: (a: number, b: number) => [number, number];
    readonly wasm_preload_asset: (a: number, b: number, c: number, d: number) => void;
    readonly wasm_start: () => void;
    readonly main: (a: number, b: number) => number;
    readonly rh_rpc_enqueue: (a: number, b: number, c: number) => void;
    readonly rust_zstd_wasm_shim_calloc: (a: number, b: number) => number;
    readonly rust_zstd_wasm_shim_free: (a: number) => void;
    readonly rust_zstd_wasm_shim_malloc: (a: number) => number;
    readonly rust_zstd_wasm_shim_memcmp: (a: number, b: number, c: number) => number;
    readonly rust_zstd_wasm_shim_memcpy: (a: number, b: number, c: number) => number;
    readonly rust_zstd_wasm_shim_memmove: (a: number, b: number, c: number) => number;
    readonly rust_zstd_wasm_shim_memset: (a: number, b: number, c: number) => number;
    readonly rust_zstd_wasm_shim_qsort: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_3698: (a: number, b: number, c: any) => [number, number];
    readonly __wasm_bindgen_func_elem_3746: (a: number, b: number, c: any, d: any) => void;
    readonly __wasm_bindgen_func_elem_11185: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_3: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_4: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_5: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_6: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_7: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_8: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_9: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_10: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_11185_11: (a: number, b: number, c: any) => void;
    readonly __wasm_bindgen_func_elem_3134: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_export4: (a: number) => void;
    readonly __wbindgen_export5: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export6: (a: number, b: number) => void;
    readonly __wbindgen_export7: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
