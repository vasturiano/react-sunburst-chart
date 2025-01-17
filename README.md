React Sunburst Chart
====================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

React bindings for the [sunburst-chart](https://github.com/vasturiano/sunburst-chart) UI component.

<p align="center">
     <a href="https://vasturiano.github.io/react-sunburst-chart/example/flare/"><img width="80%" src="https://vasturiano.github.io/react-sunburst-chart/example/flare/screenshot.png"></a>
</p>

A React component of an interactive sunburst chart for representing hierarchical data, where each data node of a tree is represented by an annular segment within multi-layered rings. 

Clicking on an arc focuses the view on the associated sub-tree, enabling a gradual exploration of the data. Clicking in the chart's center zooms out one level, while clicking on the canvas resets the zoom level to the root view.
The chart also responds to data changes by animating the arcs of each of the nodes into their new positions. 

By default the arcs areas are linearly proportional to their data values, resulting in a decrease of the thickness of the outer layers in a quadratic fashion. This can however be customized using the `radiusScaleExponent` method.

For improved performance, arcs smaller than a given threshold (`minSliceAngle`) are excluded from the DOM, allowing for representation of large data sets while maintaining a smooth interaction. See [here for an example](https://vasturiano.github.io/react-sunburst-chart/example/large-data) of a randomly generated large data structure.

## Quick start

```js
import Sunburst from 'react-sunburst-chart';
```

or using a *script* tag

```html
<script src="//unpkg.com/react-sunburst-chart"></script>
```

then

```jsx
ReactDOM.render(
  <Sunburst
    data={myData}
  />, 
  myDOMElement
);
```

## API reference

### Props

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>data</b> | <i>object</i> | - | Chart data (see below for syntax details). |
| <b>width</b> | <i>number</i> | *&lt;window width&gt;* | Chart width in px. |
| <b>height</b> | <i>number</i> | *&lt;window height&gt;* | Chart height in px. |
| <b>children</b> | <i>string</i> or <i>func</i> | `children` | Data node's children accessor, used to establish the hierarchical relationship between nodes. Supports either a <i>string</i> indicating the object's property name, or a `function(node)` which should return an array of nodes. |
| <b>label</b> | <i>string</i> or <i>func</i> | `name` | Node object label accessor, used to display labels on the arcs and their tooltips. |
| <b>size</b> | <i>string</i> or <i>func</i> | `value` | Node object size accessor, used to compute the angles of the arcs. |
| <b>color</b> | <i>string</i> or <i>func</i> | <i>grey</i> | Node object color accessor, used to color fill the arcs. |
| <b>strokeColor</b> | <i>string</i> or <i>func</i> | <i>white</i> | Node object stroke color accessor, used to color the contour of the arcs. |
| <b>nodeClassName</b> | <i>string</i> or <i>func</i> | - | Node object classname accessor. Determines the CSS class(es) to apply to each slice node. |
| <b>minSliceAngle</b> | <i>number</i> | `0.2` | Minimum angle of an arc (in degrees) required for it to be rendered in the DOM. |
| <b>maxLevels</b> | <i>number</i> | - | Maximum number of layers to show at any given time. |
| <b>excludeRoot</b> | <i>bool</i> | `false` | Whether to exclude the root node from the top level representation, to maximize the available radial space. |
| <b>centerRadius</b> | <i>number</i> | `0.1` | Relative radius of the center circle. The value should be proportional to the whole chart radius. Only values between `<0, 1>` are permitted. |
| <b>radiusScaleExponent</b> | <i>number</i> | `0.5` | Exponent of the power scale used to calculate the thickness of the multi-layered rings. The default is `0.5` (square-root) which ensures the area of every segment remains proportional to their value, by decreasing the radius outwards in a quadratic fashion. For a linear scale, use `1`. Negatives values are not permitted. |
| <b>sort</b> | <i>func</i> | *&lt;existing order*&gt; | Compare method used to sort sibling arcs. A value of `null` (*default*) maintains the existing order found in the input data structure. This method is equivalent to [d3-hierarchy's sort](https://github.com/d3/d3-hierarchy#node_sort), it receives two arguments representing two sibling arcs and expects a numeric return value (`-1`, `0` or `1`) indicating the order. Each element is an instance of [d3-hierarchy node](https://github.com/d3/d3-hierarchy#hierarchy) and has several useful properties to specify order: `data` (the corresponding data object), `value` (summed value of node and all its descendants) and `depth` (layer degree). For [example](https://vasturiano.github.io/react-sunburst-chart/example/sort-by-size/), to order arcs by angular size, use: `(a, b) => b.value - a.value`. |
| <b>showLabels</b> | <i>bool</i> | `true` | Whether to show labels in the arcs. Regardless of this setting, labels too large to fit within an arc's boundaries are automatically hidden. |
| <b>labelOrientation</b> | <i>angular, radial or auto</i> | `auto` | Orientation of the labels. `angular` positions curved labels along the arc perimeter. `radial` will orient labels along the radial axis, centered on the arc's centroid. The `auto` mode will pick whichever of the two methods that allows the label to fit inside the arc's boundaries. If both modes fit, the method that keeps the text most horizontal is selected. |
| <b>handleNonFittingLabel</b> | <i>fn(label, availablePx, node)</i> | - | How to handle labels that are too large to fit in their designated space. Expects a function that receives as arguments the label, the available space (in px) and the corresponding node object. This function should return a string to be rendered instead, or a falsy value indicating the label should be hidden (default). See [here for a label truncation example](https://vasturiano.github.io/react-sunburst-chart/example/truncate-labels). |
| <b>showTooltip</b> | <i>func</i> | `() => true` | Specify a node object tooltip's visibility. If this function returns `false` for a particular node, that node's tooltip will not display at all. If unspecified, all nodes' tooltips will display. |
| <b>tooltipTitle</b> | <i>func</i> | | Node object tooltip title. The function should return a string to be displayed in bold in the first line of the tooltip. If unspecified, the full hierarchical name will be displayed. |
| <b>tooltipContent</b> | <i>func</i> | | Node object tooltip content. Use this to specify extra content in each of the arc's tooltips in addition to the title set in `tooltipTitle`. |
| <b>onHover</b> | <i>func</i> | | Callback function for mouse hover events. The data node object (or `null` if hovering on background) and the event object are included as arguments `onHover(node, event)`. |
| <b>onClick</b> | <i>func</i> | | Callback function for click events. The data node object (or `null` if clicking on background) and the event object are included as arguments `onClick(node, event)`. A falsy value (default) automatically focuses on clicked nodes, equivalent to `onClick={chartRef.current.focusOnNode}`. |
| <b>onRightClick</b> | <i>func</i> | | Callback function for right-click events. The data node object (or `null` if right-clicking on background) and the event object are included as arguments `onRightClick(node, event)`. A falsy value (default) will fallback to the default browser behaviour, which is to open the context menu. |
| <b>transitionDuration</b> | <i>number</i> | `750` | Animation duration of transitions between states (opening, zoom in/out) in milliseconds. Enter `0` to disable animations. |

### Component Methods

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>focusOnNode</b> | [<i>object</i>] | The data node to focus the chart on. Use this method to retrieve the current node in focus, or to programmatically zoom the chart to a particular node. |

## Data syntax

```js
{
  name: "root",
  children: [
    {
      name: "leafA",
      value: 3
    },
    {
      name: "nodeB",
      children: [
        {
          name: "leafBA",
          value: 5
        },
        {
          name: "leafBB",
          value: 1
        }
      ]
    }
  ]
}
```

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!

[npm-img]: https://img.shields.io/npm/v/react-sunburst-chart
[npm-url]: https://npmjs.org/package/react-sunburst-chart
[build-size-img]: https://img.shields.io/bundlephobia/minzip/react-sunburst-chart
[build-size-url]: https://bundlephobia.com/result?p=react-sunburst-chart
[npm-downloads-img]: https://img.shields.io/npm/dt/react-sunburst-chart
[npm-downloads-url]: https://www.npmtrends.com/react-sunburst-chart
