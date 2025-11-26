import type { JSXOutput } from '@qwik.dev/core';
interface CustomMatchers<R = unknown> {
  toMatchVDOM(expectedJSX: JSXOutput, isCsr?: boolean): R;
  toMatchDOM(expectedDOM: JSXOutput): Promise<R>;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
