import Taro, {Component} from '@tarojs/taro';
import { act, render } from '../index';
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

describe('class component test', () => {
  it('should render componen', () => {
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
