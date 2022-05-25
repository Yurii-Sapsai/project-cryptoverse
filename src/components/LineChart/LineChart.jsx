import millify from 'millify';
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function LineChart({ coinHistory, currentPrice, coinName }) {


    const coinPrice = []
    const coinTimestamp = []

     for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

       const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      }; 
    
      const options = {
        scales: {
          y: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      console.log(coinTimestamp)
      console.log(options)
      console.log(coinHistory?.data)
    return (
        <div>
            <div>
            <h4>{coinName} Price Chart</h4>
            <h5>{coinHistory?.data?.change}%</h5>
            <h5>Current {coinName} Price: $ {millify(currentPrice)}</h5>
            </div>
              <Line data={data} options={options} />             
        </div>
    )
}

export default LineChart