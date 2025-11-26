// Qwik global flags - This MUST run before ANY Qwik module loads
// These flags are read at module load time, not at runtime
;(globalThis as any).qTest = true
;(globalThis as any).qRuntimeQrl = true
;(globalThis as any).qDev = true
;(globalThis as any).qInspector = false
import { beforeAll } from 'vitest';

// This has to run before qdev.ts loads. `beforeAll` is too late
globalThis.qTest = true;
globalThis.qRuntimeQrl = true;
globalThis.qDev = true;
globalThis.qInspector = false;

beforeAll(async () => {
  const { getTestPlatform } = await import('@qwik.dev/core/testing');
  const { setPlatform } = await import('@qwik.dev/core/internal');
  setPlatform(getTestPlatform() as any);
});



// console.log('[test-setup] Global flags set')
// console.log('[test-setup] qRuntimeQrl:', (globalThis as any).qRuntimeQrl)
// console.log('[test-setup] __qwik_reg_symbols:', (globalThis as any).__qwik_reg_symbols)

// import { TextEncoder, TextDecoder } from 'node:util'

// // Fix for esbuild's Uint8Array instanceof check in jsdom environment
// const NodeTextEncoder = TextEncoder
// const OriginalUint8Array = Uint8Array

// class PatchedTextEncoder extends NodeTextEncoder {
//   override encode(input?: string): Uint8Array {
//     const result = super.encode(input)
//     Object.setPrototypeOf(result, OriginalUint8Array.prototype)
//     return result
//   }
// }

// // @ts-expect-error - Type mismatch due to different Uint8Array generics
// globalThis.TextEncoder = PatchedTextEncoder
// // @ts-expect-error - Type mismatch between node and browser TextDecoder
// globalThis.TextDecoder = TextDecoder

// console.log('[test-setup] Importing Qwik testing...')

// // Import Qwik testing module to register vitest matchers
// // Export the promise so Vitest waits for it
// export default (async () => {
//   const { getTestPlatform } = await import('@qwik.dev/core/testing')
//   console.log('[test-setup] getTestPlatform loaded')

//   const core = (await import('@qwik.dev/core')) as any
//   console.log('[test-setup] @qwik.dev/core loaded, setting platform...')

//   if (core.setPlatform) {
//     core.setPlatform(getTestPlatform())
//     console.log('[test-setup] Platform set successfully')
//   } else {
//     console.log('[test-setup] setPlatform not found in @qwik.dev/core')
//   }
// })()
