import nextConfig from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";

// eslint-config-next now ships a native ESLint flat config (an array of
// config objects with real plugin instances), so it's imported directly
// rather than bridged through the legacy FlatCompat shim.
const eslintConfig = [
  ...nextConfig,
  eslintConfigPrettier,
  {
    ignores: ["sanity/schemaTypes/**"],
  },
];

export default eslintConfig;
