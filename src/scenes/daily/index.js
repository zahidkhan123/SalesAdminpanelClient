import React, { useMemo, useState } from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material';
import Header from 'components/Header';
import OverviewChart from 'components/OverviewChart';
import { useGetSalesQuery } from 'store/Api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '@emotion/react';
import { ResponsiveLine } from '@nivo/line';
const Daily = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  debugger;
  const [startDate, setStartDate] = useState(new Date('2021-02-01'));
  const [endDate, setEndDate] = useState(new Date('2021-03-01'));

  const [formattedData] = useMemo(() => {
    if (!data?.data) return [];

    const { dailyData } = data?.data;
    debugger;
    const totalSalesLine = {
      id: 'totalSales',
      color: theme.palette.primary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      debugger;
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1);
        debugger;
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });
    const formattedData = [totalSalesLine, totalUnitsLine];
    console.log(
      '🚀 ~ file: index.js:47 ~ const[formattedData]=useMemo ~ formattedData:',
      formattedData
    );
    return [formattedData];
  }, [data, startDate, endDate]);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Daily' subtitle='Chart of daily Sales' />
      <Box height='75vh'>
        <Box display='flex' justifyContent='flex-end'>
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>
        {data ? (
          <ResponsiveLine
            data={formattedData}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[600],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: 'color' }}
            yFormat=' >-.2f'
            curve='catmullRom'
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                return v;
              },
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Month',
              legendOffset: 60,
              legendPosition: 'middle',
              style: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total',
              legendOffset: -50,
              legendPosition: 'middle',
              style: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Daily;
