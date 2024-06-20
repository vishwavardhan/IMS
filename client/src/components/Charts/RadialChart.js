// client/src/components/charts/RadialChart.js
import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px',
};

const CustomRadialChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <RadialBarChart
      cx="50%"
      cy="50%"
      innerRadius="10%"
      outerRadius="80%"
      barSize={10}
      data={data}
    >
      <RadialBar
        minAngle={15}
        label={{ position: 'insideStart', fill: '#fff' }}
        background
        clockWise
        dataKey="value"
      />
      <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      <Tooltip />
    </RadialBarChart>
  </ResponsiveContainer>
);

export default CustomRadialChart;
