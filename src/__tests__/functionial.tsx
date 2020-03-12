import Taro, { useState } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import { StandardProps } from '@tarojs/components/types/common';

import './index.scss';

interface IconProps extends StandardProps {
  initial?: number;
}

const Counter = (props: IconProps) => {
  const { initial = 1 } = props;
  const [count, setCount] = useState(initial)
  return (
    <Text
      onClick={() => {setCount(count+1)}}
      className="number"
    >{count}</Text>
  );
};

Counter.externalClasses = ['custom-class'];

export default Counter;
