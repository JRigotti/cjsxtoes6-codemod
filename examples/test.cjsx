React = require('react')

testConstant = 'foo'

module.exports.named = 'named module exports'

module.exports = React.createClass({
  handleClick: ->
    test = 'button'
    other = 'yes'

    if false
      other = 'no'

    console.log test

  render: ->
    <div className="hello">
      <div>Hello</div>
      <button onClick={@handleClick}>Button</button>
    </div>
})
