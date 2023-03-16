import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from 'store/Api';
const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data?.data) return [];

    const { monthlyData } = data?.data;
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

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];
        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data?.data]);

  if (!data || isLoading) return 'Loading...';
  return (
    <ResponsiveLine
      data={view === 'sales' ? totalSalesLine : totalUnitsLine}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
      yFormat=' >-.2f'
      curve='catmullRom'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? '' : 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ''
          : `Total${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
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
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
