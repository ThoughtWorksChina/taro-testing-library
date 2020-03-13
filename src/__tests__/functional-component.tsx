import Taro, { useState } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import { StandardProps } from '@tarojs/components/types/common';

interface CounterProps extends StandardProps {
  initial?: number;
}

const Counter = (props: CounterProps) => {
  const { initial = 1 } = props;
  const [count, setCount] = useState(initial)
  return (
    <Text
      onClick={() => {setCount(count+1)}}
      className="number custom-class"
    >{count}</Text>
  );
};

Counter.externalClasses = ['custom-class'];

export default Counter;
