import { useMemo } from 'react';
import { CanvasTexture, NearestFilter } from 'three';
import { textureGenerators } from '../textures/generateAll';

const textureCache = new Map<string, CanvasTexture>();

export function getTexture(key: string): CanvasTexture {
  let tex = textureCache.get(key);
  if (!tex) {
    const gen = textureGenerators[key];
    if (!gen) throw new Error(`Unknown texture key: ${key}`);
    const canvas = gen();
    tex = new CanvasTexture(canvas);
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.needsUpdate = true;
    textureCache.set(key, tex);
  }
  return tex;
}

export function useTexture(key: string): CanvasTexture {
  return useMemo(() => getTexture(key), [key]);
}
