import React from 'react';
import { HotTable } from '@handsontable/react';
import FormulaBar from './FormulaBar';
import StatusBar from './StatusBar';
import { Button } from 'semantic-ui-react';

class Handsontable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { underlyingText: '', sum: '', count: '' };

    this.data = [
      [10000, 1, 1, 1, 1],
      [10000, 10, 11, 12, 13],
      [1, 20, 11, 14, 13],
      [1, 30, 15, 12, 13]
    ];

    // this.customContextMenu = {
    //   items: {
    //     clear_custom: {
    //       name: 'Numeric cell type',
    //       callback: function() {
    //         this.setCellMeta(
    //           this.state.selectedRow,
    //           this.state.selectedColumn,
    //           'type',
    //           'checkbox'
    //         );
    //       }
    //     }
    //   }
    // };
  }

  afterCellClick = (row, column, row2, column2) => {
    const underlyingText = this.refs.hot.hotInstance.getSourceDataAtCell(
      row,
      column
    );
    let selectedArray = this.refs.hot.hotInstance.getData(
      row,
      column,
      row2,
      column2
    );
    let columnSums = selectedArray.reduce(function(array1, array2) {
      return array1.map(function(value, index) {
        return value + array2[index];
      });
    });
    let totalSum = columnSums.reduce((a, b) => a + b, 0);
    console.log(this.refs.hot.hotInstance.getData(row, column, row2, column2));
    this.setState({
      underlyingText: underlyingText,
      selectedRow: row,
      selectedColumn: column,
      sum: totalSum
    });
  };

  setSelectedCellUSDollar = () => {
    this.refs.hot.hotInstance.setCellMetaObject(
      this.state.selectedRow,
      this.state.selectedColumn,
      {
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.00',
          culture: 'en-US' // this is the default culture, set up for USD
        }
      }
    );
    this.refs.hot.hotInstance.validateCells();
  };

  setSelectedEuro = () => {
    this.refs.hot.hotInstance.setCellMetaObject(
      this.state.selectedRow,
      this.state.selectedColumn,
      {
        type: 'numeric',
        language: 'de-DE',
        numericFormat: {
          pattern: '0,0.00',
          culture: 'de-DE' // use this for EUR (German),
          // more cultures available on http://numbrojs.com/languages.html
        }
      }
    );
    this.refs.hot.hotInstance.validateCells();

    console.log('date' + this.state.selectedRow + this.state.selectedColumn);
  };

  InsertColumns = () => {
    this.refs.hot.hotInstance.alter('insert_col', this.state.selectedColumn, 5);
  };

  render() {
    return (
      <div id="hot-app">
        <FormulaBar underlyingText={this.state.underlyingText} />
        <Button onClick={this.setSelectedCellUSDollar}>Set to US $ type</Button>
        <Button onClick={this.setSelectedEuro}>Set to euro type</Button>
        <Button onClick={this.getCellMeta_H}>Get Cell Meta</Button>
        <Button onClick={this.InsertColumns}>
          Insert 5 columns to the left
        </Button>

        <HotTable
          root="hot"
          ref="hot"
          data={this.data}
          colHeaders={true}
          rowHeaders={true}
          width="1000"
          height="300"
          // contextMenu={this.customContextMenu}
          formulas
          afterSelectionEnd={this.afterCellClick}
          manualColumnResize
          manualRowResize
          contextMenu
          // columns={[
          //   {},
          //   {},
          //   {},
          //   {
          //     type: 'numeric',
          //     numericFormat: {
          //       pattern: '$0,0.00',
          //       culture: 'en-US' // this is the default culture, set up for USD
          //     },
          //     allowEmpty: false
          //   },
          //   {
          //     type: 'numeric',
          //     numericFormat: {
          //       pattern: '0,0.00 $',
          //       culture: 'de-DE' // use this for EUR (German),
          //       // more cultures available on http://numbrojs.com/languages.html
          //     }
          //   }
          // ]}
        />
        <StatusBar sum={this.state.sum} count={this.state.count} />
      </div>
    );
  }
}

export default Handsontable;
