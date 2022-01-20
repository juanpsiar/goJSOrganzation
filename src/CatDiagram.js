import React from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */

go.Shape.defineFigureGenerator('ExpandedLine', function (shape, w, h) {
  return new go.Geometry().add(
    new go.PathFigure(0, 0.25 * h, false)
      .add(new go.PathSegment(go.PathSegment.Line, 0.5 * w, 0.75 * h))
      .add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h))
  );
});

// use a sideways V figure instead of PlusLine in the TreeExpanderButton
go.Shape.defineFigureGenerator('CollapsedLine', function (shape, w, h) {
  return new go.Geometry().add(
    new go.PathFigure(0.25 * w, 0, false)
      .add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.5 * h))
      .add(new go.PathSegment(go.PathSegment.Line, 0.25 * w, h))
  );
});

const treeDiagramArray = [
  { key: '1', name: 'Don Meow' },
  { key: '2', parent: '1', name: 'Demeter' },
  { key: '3', parent: '1', name: 'Copricat' },
  { key: '4', parent: '3', name: 'Jellylorum' },
  { key: '5', parent: '3', name: 'Alonzo' },
  { key: '6', parent: '2', name: 'Munkustrap' },
];
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    allowMove: false,
    'undoManager.isEnabled': true, // must be set to allow for model change listening
    // layout: new go.TreeModel(),
    layout: $(go.TreeLayout, {
      alignment: go.TreeLayout.AlignmentStart,
      angle: 0,
      compaction: go.TreeLayout.CompactionNone,
      layerSpacing: 16,
      layerSpacingParentOverlap: 1,
      nodeIndentPastParent: 1.0,
      nodeSpacing: 0,
      setsPortSpot: false,
      setsChildPortSpot: false,
    }),
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
      new go.Binding('text', 'name').makeTwoWay()
    )
  );
  diagram.linkTemplate = $(go.Link);
  diagram.model = new go.TreeModel(treeDiagramArray);

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
function CatDiagram() {
  return (
    <div>
      ...
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="cat-component"
        nodeDataArray={
          treeDiagramArray
          // [
          //   { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
          //   { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
          //   { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
          //   { key: 3, text: 'Delta', color: 'pink', loc: '150 150' },
          // ]
        }

        // onModelChange={handleModelChange}
      />
      ...
    </div>
  );
}

export default CatDiagram;
