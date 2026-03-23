/**
 * i18next TypeScript module augmentation
 *
 * We intentionally do NOT override CustomTypeOptions here.
 * This means i18next falls back to its built-in permissive types,
 * accepting `string` keys without compile errors.
 *
 * Benefits retained:
 *  - namespaceSeparator ":" and keySeparator "." still work at runtime
 *  - All lazy-loading, language detection, and namespacing features work
 *  - No false-positive TypeScript errors from dynamic key strings in
 *    Header, Footer, or other components that store translation keys in
 *    data arrays
 *
 * Future improvement (when key strings are standardised to ns:key format):
 *  - Re-enable strict resource types by importing JSON locale files
 *    and mapping them in CustomTypeOptions.resources
 */

// This file intentionally left minimal — no CustomTypeOptions override.
export {};
