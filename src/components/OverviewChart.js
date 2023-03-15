import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from 'store/Api';
const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme;
  return <div>Overview Chart</div>;
};

export default OverviewChart;
