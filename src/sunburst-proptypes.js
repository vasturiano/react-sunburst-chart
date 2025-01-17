import PropTypes from 'prop-types';

export default {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  nodeClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  minSliceAngle: PropTypes.number,
  maxLevels: PropTypes.number,
  excludeRoot: PropTypes.bool,
  centerRadius: PropTypes.number,
  radiusScaleExponent: PropTypes.number,
  sort: PropTypes.func,
  showLabels: PropTypes.bool,
  labelOrientation: PropTypes.oneOf(['angular', 'radial', 'auto']),
  handleNonFittingLabel: PropTypes.func,
  showTooltip: PropTypes.func,
  tooltipTitle: PropTypes.func,
  tooltipContent: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onRightClick: PropTypes.func,
  transitionDuration: PropTypes.number
};
