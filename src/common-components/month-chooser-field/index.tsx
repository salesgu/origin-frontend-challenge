import * as React from 'react';
import * as PropTypes from 'prop-types';
import arrow from '../../assets/svg/icons/arrow.svg';
import getMonthsFromNow from '../../lib/get-months-from-now';

import {
  StyledWrapper,
  StyledLabel,
  StyledDatePickerField,
  StyledArrow
} from './styles';
import Svg from '../svg';

export enum MonthChooserArrowTypes {
  INCREMENT,
  DECREMENT
}

interface MonthChooserFieldProps {
  label: React.ReactNode;
  defaultValue: number;
  onChange: (...args: any[]) => any;
  children?: React.ReactNode;
}

const MonthChooserField: React.SFC<MonthChooserFieldProps> = ({
  label,
  defaultValue,
  onChange
}) => {
  const [months, setMonths] = React.useState(defaultValue);
  const [dateLabel, setDateLabel] = React.useState(
    getMonthsFromNow(defaultValue)
  );

  function handleChangeMonths(type: MonthChooserArrowTypes) {
    let newMonthValue = months;

    if (type === MonthChooserArrowTypes.DECREMENT && months > 2) {
      newMonthValue = months - 1;
    }

    if (type === MonthChooserArrowTypes.INCREMENT) {
      newMonthValue = months + 1;
    }

    const dateLabels = getMonthsFromNow(newMonthValue);

    setMonths(newMonthValue);
    setDateLabel(dateLabels);

    onChange(newMonthValue, dateLabels);
  }

  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledWrapper>
        <StyledArrow
          className="prev-arrow"
          onClick={() => handleChangeMonths(MonthChooserArrowTypes.DECREMENT)}
        >
          <Svg src={arrow} />
        </StyledArrow>
        <StyledDatePickerField className="date">
          <strong>{dateLabel.month}</strong>
          <span>{dateLabel.year}</span>
        </StyledDatePickerField>
        <StyledArrow
          next
          className="next-arrow"
          onClick={() => handleChangeMonths(MonthChooserArrowTypes.INCREMENT)}
        >
          <Svg src={arrow} />
        </StyledArrow>
      </StyledWrapper>
    </div>
  );
};

MonthChooserField.defaultProps = {
  onChange: () => {},
  defaultValue: 1
};

export default MonthChooserField;