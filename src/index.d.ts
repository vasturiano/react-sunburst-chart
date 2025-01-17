import * as React from 'react';

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type NodeAccessor<T> = Accessor<Node, T>;

export interface Node {
  __dataNode?: DataNode;
  name?: string;
  children?: Node[];
  [key: string]: any;
}

export interface DataNode {
  data: Node;
  id: number;
  value: number;
  depth: number;
  height: number;
  parent: DataNode | null;
  children?: DataNode[];
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
}

type Orientation = 'angular' | 'radial' | 'auto';

type CompareFn<ItemType> = (a: ItemType, b: ItemType) => number;

type TooltipFn = (node: Node, dataNode: DataNode) => string;

type NonFittingLabelFn = (label: string, availablePx: number, node: DataNode) => string | null | undefined | false;

export interface SunburstProps {
  width?: number;
  height?: number;

  data?: Node;
  children?: NodeAccessor<Node[]>;
  label?: NodeAccessor<string>;
  size?: NodeAccessor<string>;
  color?: NodeAccessor<string>;
  strokeColor?: NodeAccessor<string>;
  nodeClassName?: NodeAccessor<string>;

  minSliceAngle?: number;
  maxLevels?: number;
  excludeRoot?: boolean;
  centerRadius?: number;
  radiusScaleExponent?: number;

  sort?: CompareFn<Node> | null;

  showLabels?: boolean;
  labelOrientation?: Orientation;
  handleNonFittingLabel?: NonFittingLabelFn | null;
  showTooltip?: (node: Node) => boolean;
  tooltipTitle?: TooltipFn;
  tooltipContent?: TooltipFn;

  onClick?: (node: Node, event: MouseEvent) => void;
  onRightClick?: (node: Node, event: MouseEvent) => void;
  onHover?: (node: Node | null, event: MouseEvent) => void;

  transitionDuration?: number;
}

export interface SunburstMethods {
  focusOnNode(node: Node | null): void;
}

type FCwithRef<P = {}, R = {}> = React.FunctionComponent<P & { ref?: React.MutableRefObject<R | undefined> }>;

declare const Sunburst: FCwithRef<SunburstProps, SunburstMethods>;

export default Sunburst;
