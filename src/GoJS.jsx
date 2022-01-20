import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './App.css'; // contains .diagram-component CSS

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': true, // must be set to allow for model change listening
    layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }),
    allowMove: false,

    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    // 'clickCreatingTool.archetypeNodeData': {
    //   text: 'new node',
    //   color: 'lightblue',
    // },
    model: new go.GraphLinksModel({
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    'Auto', // the Shape will go around the TextBlock
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      'RoundedRectangle',
      { name: 'SHAPE', fill: '#cacaca', strokeWidth: 0 },
      // Shape.fill is bound to Node.data.color
      new go.Binding('fill', 'color')
    ),
    $(
      go.TextBlock,
      { margin: 5, editable: false, stroke: 'blue' }, // some room around the text
      new go.Binding('text').makeTwoWay()
    )
  );

  //   diagram.linkTemplate = $(
  //     go.Link,
  //     new go.Binding('relinkableFrom', 'canRelink').ofModel(),
  //     new go.Binding('relinkableTo', 'canRelink').ofModel(),
  //     $(go.Shape),
  //     $(go.Shape, { toArrow: 'Standard' })
  //   );

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
  alert('GoJS model changed!');
}

// render function...
function Diagram() {
  return (
    <div>
      ...
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        // nodeDataArray={[
        //   { key: 0, text: 'Epsilon', color: 'lightblue' },
        //   { key: 1, text: 'Zeta', color: 'orange' },
        //   { key: 2, text: 'Eta', color: 'lightgreen' },
        //   { key: 3, text: 'Theta', color: 'pink' },
        // ]}
        // linkDataArray={[
        //   { key: -1, from: 0, to: 1 },
        //   { key: -2, from: 0, to: 2 },
        //   { key: -3, from: 1, to: 1 },
        //   { key: -4, from: 2, to: 3 },
        //   { key: -5, from: 3, to: 0 },
        // ]}
        nodeDataArray={
          [
            { key: 1, text: 'Stella Payne Diaz', color: 'red' },
            {
              key: 2,
              text: 'Luke Warm',
            },
            { key: 3, text: 'Meg Meehan Hoffa' },
            {
              key: 4,
              text: 'Peggy Flaming',
            },
            {
              key: 5,
              text: 'Saul Wellingood',
              title: 'Manufacturing',
              parent: 4,
            },
            { key: 6, text: 'Al Ligori' },
            { key: 7, text: 'Dot Stubadd' },
            { key: 8, text: 'Les Ismore' },
            {
              key: 9,
              text: 'April Lynn Parris',
              title: 'Events Mgr',
              parent: 6,
            },
            { key: 10, text: 'Xavier Breath' },
            { key: 11, text: 'Anita Hammer' },
            { key: 12, text: 'Billy Aiken' },
            { key: 13, text: 'Stan Wellback' },
            { key: 14, text: 'Marge Innovera' },
            { key: 15, text: 'Evan Elpus' },
            { key: 16, text: 'Lotta B. Essen' },
          ]
          // [
          //   { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
          //   { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
          //   { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
          //   { key: 3, text: 'Delta', color: 'pink', loc: '150 150' },
          // ]
        }
        linkDataArray={[
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 1, to: 5 },
          { from: 2, to: 6 },
          { from: 3, to: 7 },
          { from: 3, to: 8 },
          { from: 2, to: 9 },
          { from: 1, to: 10 },
          { from: 4, to: 11 },
          { from: 4, to: 12 },
          { from: 4, to: 13 },
          { from: 4, to: 14 },
          { from: 4, to: 15 },
          { from: 4, to: 16 },
        ]}
        // onModelChange={handleModelChange}
      />
      ...
    </div>
  );
}

export default Diagram;
