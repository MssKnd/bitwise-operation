import type { Opaque } from "./opaque";

type FeatureFlug = Opaque<"FeatureFlug", number>;

const NUMBER_OF_FEATURE_DIGITS = 8;
const validateFeatureFlug = (flug: number) => {
  if (flug >= 0 && flug < (NUMBER_OF_FEATURE_DIGITS ^ 2))
    return flug as FeatureFlug;
  throw new Error();
};
const FEATURE = {
  MAIL_NOTIFICATION: validateFeatureFlug(1 << 0), // 00000001
  STATICTICS: validateFeatureFlug(1 << 1), // 00000010
  MULTI_AUTHENTICATION: validateFeatureFlug(1 << 2) // 000000100
} as const;

const mergeFeatureFlug = (...features: FeatureFlug[]) =>
  validateFeatureFlug(features.reduce((sum, feature) => sum | feature, 0));

const canUseFeature = (mask: number) => (feature: number) =>
  (mask & feature) === mask;

export type { FeatureFlug };
export { FEATURE, mergeFeatureFlug, canUseFeature, validateFeatureFlug };
