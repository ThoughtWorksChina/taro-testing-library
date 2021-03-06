# taro-testing-library
Simple and complete taro.js 2.x testing utilities that encourage good testing practices.

[![Actions Status](https://github.com/ThoughtWorksChina/taro-testing-library/workflows/Node%20CI/badge.svg)](https://github.com/ThoughtWorksChina/taro-testing-library/actions)
[![NPM](https://img.shields.io/npm/v/taro-testing-library.svg)](https://www.npmjs.com/package/taro-testing-library)
[![license](https://badgen.net/badge/license/MIT/blue)](https://github.com/ThoughtWorksChina/taro-testing-library/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/ThoughtWorksChina/taro-testing-library/branch/master/graph/badge.svg)](https://codecov.io/gh/ThoughtWorksChina/taro-testing-library)


## Install
```bash
// use yarn
yarn add taro-testing-library -D
// use npm
npm install taro-testing-library -D
```

### For Taro 3.x

For Taro 3.x and React, can use [react-testing-library](https://github.com/testing-library/react-testing-library) directly. 

the only need is to configure `moduleNameMapper` in  `jest.config.js` like this.

```js
{
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist-h5/react',
    ...
  },
}
```


## Usage
set `preset` in your jest config file
```json
{
  "preset": "taro-testing-library"
}
```

### API


## API
### render
* `render(Component, { container, target }) => { container, unmount, rerender }`: render method to mount a component

  * `container`:  The HTML element the component is mounted into. 
     
     default : `document.body`
  * `target`: The HTML element the component is mounted. 
     
     default : `container.appendChild(document.createElement('div'))`

#### Result
* `container`: container
* `component`: created Taro.js component
* `rerender(Component)`: method of rerender component
* `unmount()`: method of unmount component
* `debug()`: method of log current dom
* `...queries`: Returns all [query functions](https://testing-library.com/docs/dom-testing-library/api-queries) that are binded to the target.


### renderToString
`renderToString(Component) => string`: export from [nerv-server](https://github.com/NervJS/nerv-server), you can use it to match snapshot

### cleanup
Unmounts the component from the container and destroys the container.

`cleanup()` is called after each test automatically by default if the testing framework you're using supports the afterEach global (like mocha, Jest, and Jasmine).

However, you may choose to skip the auto cleanup by setting the `TTL_SKIP_AUTO_CLEANUP` env variable to 'true'.

To make this even easier, you can also simply import `taro-testing-library/dont-cleanup-after-each` which will do the same thing.

## Demo

### Component

```jsx
import Taro, { useState } from '@tarojs/taro';
import { Text } from '@tarojs/components';

const Counter = (props) => {
  const { initial = 1 } = props;
  const [count, setCount] = useState(initial)
  return (
    <Text onClick={() => {setCount(count+1)}} className="number">
      {count}
    </Text>
  );
};
```

### Test

```jsx
import Taro from '@tarojs/taro';
import { act, render } from 'taro-testing-library';

test('should render component', () => {
  const { container } = render(<Counter />);
  const $number = container.querySelector('.number');
  expect($number.innerHTML).toEqual('1');
});

test('should rerender when trigger setState hooks', () => {
  const { container } = render(<Counter />);
  const $number = container.querySelector('.number');
  act(() => {
    $number.click()
  })
  expect($number.innerHTML).toEqual(`2`);
});

it('should support snapshot', () => {
  const component = renderToString(<div>component without state</div>);
  expect(component).toMatchSnapshot();
})
```
