import fromKapsule from 'react-kapsule';
import SunburstKapsule from 'sunburst-chart';
import SunburstPropTypes from './sunburst-proptypes';

const Sunburst = fromKapsule(
  SunburstKapsule,
  {
    methodNames: [ // bind methods
      'focusOnNode'
    ]
  }
);

Sunburst.displayName = 'SunburstChart';
Sunburst.propTypes = SunburstPropTypes;

export default Sunburst;
