---
name: nurvexthink-3d-perf
description: Use when building or editing 3D scenes (React Three Fiber / Three.js / drei) in the NurvexThink website — enforces on-demand rendering, ref-based mutation, asset compression, LOD, and GPU resource disposal for fast, smooth 3D.
---

# NurvexThink — 3D (React Three Fiber / Three.js) Performance

Apply these to every 3D scene (the metallic "NT" hero, product visuals, decorative scenes).
Sourced from the R3F "Scaling performance" docs and current Three.js optimization guidance.

## Golden rules

1. **Render on demand.** Set `frameloop="demand"` on `<Canvas>` so frames only render when
   something changes. Call `invalidate()` to request a frame manually. Default (render every
   frame) wastes CPU/GPU/battery when the scene is idle.
2. **Never trigger React re-renders from the animation loop.** Animate inside `useFrame` by
   mutating refs directly (`meshRef.current.rotation.y += delta`). Do NOT drive animation
   with `useState`.
3. **Lazy-load the 3D.** Load the Canvas with `next/dynamic({ ssr: false })` and wrap models
   in `<Suspense>`, so 3D never blocks first paint or LCP.

## Assets

- **Compress models:** export **GLB** with **Draco** (geometry) / **Meshopt** compression.
- **Compress textures:** use **KTX2 / Basis Universal** (GPU-friendly, smaller, faster).
- **Preload:** `useGLTF.preload(url)` and `useTexture` so assets are ready before mount.
- Resources from `useLoader`/`useGLTF` are cached by URL — reuse the same URL to share assets.
- Keep texture sizes power-of-two and only as large as needed.

## Scene optimization

- **LOD:** use drei `<Detailed>` to swap high-poly → low-poly with distance (big FPS win in
  large scenes).
- **Instancing:** use `<Instances>` / `InstancedMesh` for many repeated objects.
- Merge geometries where possible; minimize draw calls and material count.
- Reuse materials/geometries; avoid creating them inside `useFrame`.

## Memory

- Three.js does **not** garbage-collect GPU resources. Dispose geometries, materials, and
  textures when a scene unmounts (R3F disposes objects it created automatically — be careful
  with manually created ones).

## Tooling

- Use **`r3f-perf`** in development to watch draw calls, shaders, textures, vertex counts.
- Use drei helpers (`<AdaptiveDpr>`, `<AdaptiveEvents>`, `<PerformanceMonitor>`) to scale
  quality with the device.

## Brand fit

- The hero is a metallic "NT" monogram: navy `#1E2A44`–`#2D3A5C` + silver `#C0C5CE`–`#E8EBF0`
  on near-black `#0A0A0B`. Use an environment map for the metallic reflection; keep it subtle.

## References
- https://r3f.docs.pmnd.rs/advanced/scaling-performance
- https://www.utsubo.com/blog/threejs-best-practices-100-tips
- https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/
