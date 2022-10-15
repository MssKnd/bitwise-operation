declare const opaqueSymbol: unique symbol;
export type Opaque<T, U = string> = U & { readonly [opaqueSymbol]: T };
