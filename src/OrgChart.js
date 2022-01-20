import React, { Component } from 'react';
import Chart from 'react-google-charts';

const OrgData = [
  ['Name', 'Manager', 'ToolTip'],
  [
    {
      v: 'Lisa',
      f: 'Lisa<div style="color:red; font-style:italic">President</div>',
    },
    '',
    'The President',
  ],
  [
    {
      v: 'Eva',
      f: 'Eva<div style="color:red; font-style:italic">Vice President</div>',
    },
    'Lisa',
    'VP',
  ],
  ['Alice', 'Lisa', ''],
  ['Alice1', 'Lisa', ''],
  ['Alice2', 'Lisa', ''],
  ['Alice3', 'Lisa', ''],
  ['Alice4', 'Lisa', ''],
  ['Bob', 'Eva', 'Bob Sponge'],
  ['Bob1', 'Eva', 'Bob Sponge'],
  ['Bob2', 'Eva', 'Bob Sponge'],
  ['Bob3', 'Eva', 'Bob Sponge'],

  ['Genius', 'Bob', ''],
  ['Caroline', 'Bob', ''],
  ['Carol', 'Alice', ''],
  ['Carolin', 'Bob', ''],
  ['Carol1', 'Bob', ''],
  ['Carol2', 'Bob', ''],
  ['Carol3', 'Alice', ''],
  ['Carol4', 'Bob', ''],
  ['Carol5', 'Bob', ''],
  ['Boble6', 'Alice', 'Bob Sponge'],

  ['Bob1', 'Alice', 'Bob Sponge'],
  ['Bob2', 'Alice', 'Bob Sponge'],
  ['Bob3', 'Alice', 'Bob Sponge'],
  ['Bob4', 'Alice', 'Bob Sponge'],
  ['Bob5', 'Alice', 'Bob Sponge'],
  ['Bob6', 'Alice', 'Bob Sponge'],
];

const OrgOptions = {
  allowHtml: true,
  is3D: true,
};

class OrgChart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>React Organization Chart Example</h2>
        <Chart
          width={'100%'}
          height={400}
          chartType="OrgChart"
          loader={<div>Loading Chart</div>}
          data={OrgData}
          options={OrgOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
  }
}

export default OrgChart;
