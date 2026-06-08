/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_IDP_ISSUER?: string;
  readonly VITE_IDP_CLIENT_ID?: string;
  readonly VITE_IDP_REDIRECT_URI?: string;
  readonly VITE_IDP_POST_LOGOUT_URI?: string;
  readonly VITE_LINK_DATALUMINARY?: string;
  readonly VITE_LINK_VIBEEDU?: string;
  readonly VITE_LINK_VIBEAGENT?: string;
  readonly VITE_LINK_VISTAREMOTE?: string;
}
