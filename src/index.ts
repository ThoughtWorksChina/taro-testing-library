import { getQueriesForElement, prettyDOM } from '@testing-library/dom';
import Nerv, { unmountComponentAtNode, render as taroRender } from 'nervjs';
export { renderToString } from 'nerv-server';

global.Nerv = Nerv;

export * from '@testing-library/dom';

interface RenderOptions {
  container?: HTMLElement;
  target?: HTMLElement;
  [key: string]: any;
}

type Container = {
  target: HTMLElement;
  component: any;
};

const mountedContainers: Map<HTMLElement, Container> = new Map();

const cleanupAtContainer = (container: Container) => {
  const { target } = container;
  unmountComponentAtNode(target);
  if (target.parentNode) {
    target.parentNode.removeChild(target);
  }
  mountedContainers.delete(target);
};

export const render = (
  Component,
  {
    container = document.body,
    target = container.appendChild(document.createElement('div')),
  }: RenderOptions = {},
) => {
  let component
  const mount = (Component) => {
    component = taroRender(Component, target);
    mountedContainers.set(target, { target, component });
    component.forceUpdate();
  }
  mount(Component)
  return {
    get component() {
      return component;
    },
    get baseElement() {
      return target
    },
    debug: (el = container) => {
      console.log(prettyDOM(el));
    },
    container,
    unmount: () => cleanupAtContainer({ target, component }),
    ...getQueriesForElement(target),
    rerender: (Component) => {
      unmountComponentAtNode(target);
      mount(Component);
    }
  };
};

export const cleanup = () => {
  mountedContainers.forEach(cleanupAtContainer);
};

export default render;

export * from '@testing-library/dom';

export function flush(fn?: () => void) {
  return new Promise(function(resolve) {
    fn && fn();
    setTimeout(() => {
      resolve();
    }, 10); // # TODO: tricky for Nerv.js useEffect
  });
}

export function act(fn?: () => void) {
  fn && fn();
  mountedContainers.forEach(({component}) => {
    component.forceUpdate();
  })
}

// if we're running in a test runner that supports afterEach
// then we'll automatically run cleanup afterEach test
// this ensures that tests run in isolation from each other
// if you don't like this then either import the `pure` module
// or set the TTL_SKIP_AUTO_CLEANUP env variable to 'true'.
// inspired from react-testing-library
if (typeof afterEach === 'function' && !process.env.TTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup();
  });
}
