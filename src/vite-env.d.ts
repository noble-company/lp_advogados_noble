/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID: string;
  readonly VITE_PIXEL_ID: string;
  readonly VITE_META_CAPI_ENDPOINT: string;
  readonly VITE_TRACKING_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
