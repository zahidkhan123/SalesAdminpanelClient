import {
  Box,
  useTheme,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Menu,
} from '@mui/material';
import Header from 'components/Header';
import React, { useState } from 'react';
import { useGetSalesQuery } from 'store/Api';
import { ResponsiveLine } from '@nivo/line';
const Overview = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [view, setView] = useState('units');

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Overview' subtitle='Overview' />
      <Box height='75vh'>
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label='view'
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Overview;
