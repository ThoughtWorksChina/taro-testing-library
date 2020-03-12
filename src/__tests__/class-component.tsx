import Taro, { Component } from '@tarojs/taro';
import { Text } from '@tarojs/components';
import { StandardProps } from '@tarojs/components/types/common';

interface CounterProps extends StandardProps {
  initial?: number;
}

interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {

  static defaultProps = {
    initial: 1
  }

  static externalClasses = ['custom-class'];

  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initial as number
    }
  }

  render() {
    const { count } = this.state
    return (
      <Text
        onClick={() => {this.setState({
          count: count + 1
        })}}
        className="number custom-class"
      >{count}</Text>
    )
  }
}

export default Counter;
