import Taro, {useEffect, useState} from '@tarojs/taro';
import {Text} from "@tarojs/components";
import {StandardProps} from "@tarojs/components/types/common";
import { act, render } from '../index';

interface CounterProps extends StandardProps {
  initial?: number;
}

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(props.initial || 1)
  return (
    <Text
      onClick={() => {setCount(count+1)}}
      className="number custom-class"
    >{count}</Text>
  );
};

describe('functional component test', () => {
  it('should render component', () => {
    const { container } = render(<Counter />);
    const $number = container.querySelector('.number') as HTMLSpanElement;
    expect($number.innerHTML).toEqual('1');
  });

  it('should render component with props', () => {
    const initial = 10
    const { container } = render(<Counter initial={initial} />);
    const $number = container.querySelector('.number') as HTMLSpanElement;
    expect($number.innerHTML).toEqual(`${initial}`);
  });

  it('should render component with props', () => {
    const initial = 10
    const { container } = render(<Counter initial={initial} />);
    const $number = container.querySelector('.number') as HTMLSpanElement;
    expect($number.innerHTML).toEqual(`${initial}`);
  });

  it('should rerender when trigger setState hooks', () => {
    const { container } = render(<Counter />);
    const $number = container.querySelector('.number') as HTMLSpanElement;
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
