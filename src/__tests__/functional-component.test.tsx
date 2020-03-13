import Taro from '@tarojs/taro';
import { act, render } from '../index';
import Counter from './functional-component';

describe('functional component test', () => {
  it('should render component', () => {
    const { container } = render(<Counter />);
    const $number = container.querySelector('.number') as Element;
    expect($number.innerHTML).toEqual('1');
  });

  it('should render component with props', () => {
    const initial = 10
    const { container } = render(<Counter initial={initial} />);
    const $number = container.querySelector('.number') as Element;
    expect($number.innerHTML).toEqual(`${initial}`);
  });

  it('should rerender when trigger setState hooks', () => {
    const { container } = render(<Counter />);
    const $number = container.querySelector('.number') as Element;
    act(() => {
      $number.click()
    })
    expect($number.innerHTML).toEqual(`2`);
  });

  it('should rerender when excute rerender methods', () => {
    const { container, rerender } = render(<Counter />);
    expect(container.querySelector('.number').innerHTML).toEqual("1");
    rerender(<Counter initial={2} />)
    expect(container.querySelector('.number').innerHTML).toEqual("2");
  });
});
