import Taro, {useEffect, useState} from '@tarojs/taro';
import {Text, View} from "@tarojs/components";
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

const NestTest = () => {
  const [count, setCount] = useState(10)
  return (
    <View>
      <Counter initial={count}>{count}</Counter>
      <View className="button" onClick={() => {setCount(20)}}>CLICK</View>
    </View>
  );
};


describe('useEffect test', () => {
  it('should excute useEffect method', () => {
    const { container } = render(<Counter />);
    const number = container.querySelector('.number') as HTMLSpanElement;
    expect(number.innerHTML).toEqual('1');
  });

  it('should excute useEffect method', () => {
    const { container } = render(<NestTest />);
    const number = container.querySelector('.number') as HTMLSpanElement;
    expect(number.innerHTML).toEqual('10');
  });
});
