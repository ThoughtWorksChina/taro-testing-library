import Taro, {useEffect, useState} from '@tarojs/taro';
import {Text} from "@tarojs/components";
import { render } from '../index';
import {StandardProps} from "@tarojs/components/types/common";


interface CounterProps extends StandardProps {
  initial?: number;
}

const Counter = (props: CounterProps) => {
  const {initial} = props
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(initial || 1)
  }, [initial])
  return (
    <Text
      onClick={() => {setCount(count+1)}}
      className="number custom-class"
    >{count}</Text>
  );
};

describe('useEffect test', () => {
  it('should excute useEffect method', () => {
    const { container } = render(<Counter />);
    const number = container.querySelector('.number') as HTMLSpanElement;
    expect(number.innerHTML).toEqual('1');
  });
});