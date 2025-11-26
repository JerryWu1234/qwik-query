
import { domRender, ssrRenderToDom, trigger } from '@qwik.dev/core/testing';
import { describe, expect, it } from 'vitest';
import {
  component$,
  useSignal,
  useStore,
  Fragment as Component,
  Fragment,
  JSXOutput,
} from '@qwik.dev/core';

interface QwikVitestMatchers<R = unknown> {
  toMatchVDOM(expectedJSX: JSXOutput, isCsr?: boolean): R;
  toMatchDOM(expectedDOM: JSXOutput): Promise<R>;
}
declare module 'vitest' {
  interface Assertion<T = any> extends QwikVitestMatchers<T> {}
}

const debug = true; //true;
Error.stackTraceLimit = 100;

describe.each([
  { render: ssrRenderToDom }, //
  { render: domRender }, //
])('$render.name: attributes', ({ render }) => {
  it('should render boolean and number attributes', async () => {
    const AttrComp = component$(() => {
      const required = useSignal(false);
      const state = useStore({
        dataAria: true,
      });

      return (
        <>
          <button id="req" onClick$={() => (required.value = !required.value)}></button>
          <input
            id="input"
            required={required.value}
            aria-hidden={state.dataAria}
            aria-required="false"
            draggable={required.value}
            spellcheck={required.value}
            tabIndex={-1}
          />
        </>
      );
    });

    const { vNode, document } = await render(<AttrComp />, { debug });

    await expect(document.body.querySelector('input')).toMatchDOM(
      <input
        id="input"
        aria-hidden="true"
        aria-required="false"
        draggable={false}
        spellcheck={false}
        tabIndex={-1}
      />
    );

  });
});
