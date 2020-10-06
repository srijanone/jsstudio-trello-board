import React from 'react';
import { addDecorator } from '@storybook/react';
import DateRangeFilter from './DateRangeFilter';
import centered from '@storybook/addon-centered/react';

addDecorator(centered);

export default {
  title: 'DateRangeFilter',
  component: DateRangeFilter
};

export const Default = () => (
  <div>
    <DateRangeFilter />
  </div>
);