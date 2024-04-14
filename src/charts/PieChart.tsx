import React from 'react';
import  Pie  from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Category } from '../types';

interface PieChartProps {
  categories: Category[];
}

const PieChart: React.FC<PieChartProps> = ({ categories }) => {
  const chartData = categories.map((category) => ({
    name: category.title,
    y: category.products ? category.products.length : 0,
  }));

  const options = {
    title: {
      text: 'Categories'
    },
    series: [
      {
        type: 'pie',
        data: chartData
      }
    ]
  };

  return <Pie highcharts={Highcharts} options={options} />;
};

export default PieChart;