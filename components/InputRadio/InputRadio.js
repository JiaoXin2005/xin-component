
const PREFIX_CLS = 'input-radio';

export default class InputRadio extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <div className={`${PREFIX_CLS}`}>
        {children}
        <i className={`xuicon`}></i>
      </div>
    );
  }
}