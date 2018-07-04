/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import React from 'react';

const testConstant = 'foo';

export const named = 'named module exports';

export default class extends React.Component {
  handleClick = () => {
    const test = 'button';
    let other = 'yes';

    if (false) {
      other = 'no';
    }

    return console.log(test);
  };

  render() {
    return <div className="hello"><div>Hello</div><button onClick={this.handleClick}>Button</button></div>;
  }
}
