import Taro from '@tarojs/taro';
import { act, render } from '../index';
import Counter from './class-component';

describe('class component test', () => {
  it('should render componen', () => {
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
});
