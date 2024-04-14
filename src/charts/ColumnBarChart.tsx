import React from 'react';
import  Column  from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Product } from '../types';
interface ColumnBarChartProps {
  products: Product[];
}

const ColumnBarChart: React.FC<ColumnBarChartProps> = ({ products }) => {
  const chartData = products.map((product) => ({
    name: product.title,
    y: product.price
  }));

  const options = {
    title: {
      text: 'Products'
    },
    xAxis: {
      categories: chartData.map((data) => data.name)
    },
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    series: [
      {
        type: 'column',
        data: chartData.map((data) => data.y)
      }
    ]
  };

  return <Column highcharts={Highcharts} options={options} />;
};

export default ColumnBarChart;