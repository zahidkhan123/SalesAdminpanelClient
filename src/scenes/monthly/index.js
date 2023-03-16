import React, { useMemo } from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material';
import Header from 'components/Header';
import { useGetSalesQuery } from 'store/Api';
import { useTheme } from '@emotion/react';
import { ResponsiveLine } from '@nivo/line';
const Monthly = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [formattedData] = useMemo(() => {
    if (!data?.data) return [];

    const { monthlyData } = data?.data;
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

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });
    const formattedData = [totalSalesLine, totalUnitsLine];
    console.log(
      '🚀 ~ file: index.js:47 ~ const[formattedData]=useMemo ~ formattedData:',
      formattedData
    );
    return [formattedData];
  }, [data]);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Monthly' subtitle='Chart of Monthly Sales' />
      <Box height='75vh'>
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

export default Monthly;
