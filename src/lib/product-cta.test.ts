import { describe, it, expect } from "vitest";
import { productCta } from "@/lib/product-cta";

describe("productCta", () => {
  it("returns live for a real URL on a live/beta product", () => {
    expect(productCta({ status: "Live", liveUrl: "https://x.app" })).toEqual({
      kind: "live",
      href: "https://x.app",
    });
    expect(productCta({ status: "Beta", liveUrl: "https://x.app" })).toEqual({
      kind: "live",
      href: "https://x.app",
    });
  });

  it("returns soon when lifecycle is Soon, regardless of URL", () => {
    expect(productCta({ status: "Soon", liveUrl: "https://x.app" })).toEqual({ kind: "soon" });
  });

  it("returns soon when the URL is empty or the '#' placeholder", () => {
    expect(productCta({ status: "Live", liveUrl: "#" })).toEqual({ kind: "soon" });
    expect(productCta({ status: "Live", liveUrl: "" })).toEqual({ kind: "soon" });
  });
});
