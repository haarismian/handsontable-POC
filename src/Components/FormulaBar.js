// // The formula is stored as a source data. So it is
// available through getSourceDataAtCell() (https://handsontable.com/docs/7.3.0/Core.html#getSourceDataAtCell) method.
// In combination with getSelectedLast() (https://handsontable.com/docs/7.3.0/Core.html#getSelectedLast) or afterSelection
// (https://handsontable.com/docs/7.3.0/Hooks.html#event:afterSelection) event you've got everything you need to update the formula bar with currently
// selected formula.
import React from 'react';
import { Header } from 'semantic-ui-react';

class FormulaBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Header as="h2">
        {this.props.underlyingText
          ? this.props.underlyingText
          : 'I am the formula bar'}
      </Header>
    );
  }
}

export default FormulaBar;
