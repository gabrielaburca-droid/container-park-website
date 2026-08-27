import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

// TEMPORARY — local-asset escape hatch for the mock data layer
// (src/lib/mock/, src/data/mock/). Mock image objects are shaped like
// `{ asset: { _ref: "local:/mock/missing-card.svg" }, alt }` — this lets
// them resolve to a static file under public/ instead of a Sanity CDN URL,
// without any component that calls urlForImage(...).width().height().url()
// needing to know or care. Safe to remove once the mock layer is retired;
// real Sanity images never carry a "local:" ref and are unaffected.
interface LocalAssetSource {
  asset: { _ref: string };
}

function isLocalAssetRef(source: SanityImageSource): source is LocalAssetSource {
  if (typeof source !== "object" || source === null || !("asset" in source)) return false;
  const ref = (source as LocalAssetSource).asset?._ref;
  return typeof ref === "string" && ref.startsWith("local:");
}

interface ChainableLocalUrl {
  width: (w: number) => ChainableLocalUrl;
  height: (h: number) => ChainableLocalUrl;
  url: () => string;
}

function localImageBuilder(path: string): ChainableLocalUrl {
  const chain: ChainableLocalUrl = {
    width: () => chain,
    height: () => chain,
    url: () => path,
  };
  return chain;
}

export function urlForImage(source: SanityImageSource) {
  if (isLocalAssetRef(source)) {
    return localImageBuilder(source.asset._ref.replace(/^local:/, ""));
  }
  return builder.image(source);
}
