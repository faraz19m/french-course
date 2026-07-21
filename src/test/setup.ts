import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Node 22+ exposes a native experimental `localStorage` global that requires a
// backing file and otherwise throws ("localStorage.getItem is not a function").
// It shadows jsdom's working implementation, so we install a simple, spec-shaped
// in-memory Storage and force it onto globalThis for tests.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length(): number {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  configurable: true,
  writable: true,
});

// Unmount any rendered components and clear persisted state between tests so no
// test leaks DOM nodes or localStorage into the next one.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
