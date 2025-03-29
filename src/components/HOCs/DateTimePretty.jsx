import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const withDateTimePretty = (WrappedComponent) => {
  const DateTimePretty = ({ date, ...restProps }) => {
    let formattedDate = 'N/A';  
    if (date) {
      const momentDate = typeof date === 'string' 
        ? moment(date, 'YYYY-MM-DD', true)
        : moment(date);
      formattedDate = momentDate.isValid() 
        ? momentDate.format('DD.MM.YYYY')
        : 'Invalid date format';
    }
      return <WrappedComponent {...restProps} text={formattedDate} />;
    };

  DateTimePretty.displayName = `WithDateTimePretty(${WrappedComponent.displayName 
    || WrappedComponent.name || 'Component'})`;
  DateTimePretty.propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment)
    ]),
  };
  return DateTimePretty;
};
export default withDateTimePretty;
