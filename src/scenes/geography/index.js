import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import React from 'react';
import { useGetGeographyQuery } from 'store/Api';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'store/geoData';
const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  debugger;
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Geography' subtitle='List of all GeoGraphy' />
      <Box
        mt='30px'
        height='75vh'
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius='4px'
      >
        {data?.data ? (
          <ResponsiveChoropleth
            data={data?.data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
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
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: -10, left: -60 }}
            // colors='nivo'
            domain={[0, 60]}
            unknownColor='#666666'
            label='properties.name'
            projectionScale={150}
            valueFormat='.2s'
            projectionType='transverseMercator'
            projectionTranslation={[0.55, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={1.3}
            borderColor='#ffffff'
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.secondary[200],
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>...Loading</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
