import Taro, {Component} from '@tarojs/taro';
import { render } from '../index';
import {StandardProps} from "@tarojs/components/types/common";
import {Text} from "@tarojs/components";

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

describe('snapshot test', () => {
  it('should pass snapshot', () => {
    const { baseElement } = render(<Counter />);
    expect(baseElement).toMatchSnapshot()
  });
});
