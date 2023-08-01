import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas id="lineChart" width="400" height="200"></canvas>
  `,
})
export class App implements OnInit {
  name = 'Angular';

  ngOnInit() {
    this.generateLineChart();
  }

  generateLineChart() {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const data: any = {
      labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль'],
      datasets: [
        {
          label: 'Ушли',
          data: [0, 3, 2, 0, 2, 1, 3],
          borderColor: '#F35471',
          backgroundColor: '#F35471',
          fill: true,
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value: any, ctx: any) => {
              if (ctx.dataIndex === 0) {return ''}
              const diff = value - data.datasets[0].data[ctx.dataIndex - 1];
              if (diff > 0) {
                return '+' + diff;
              } else {
                return diff;
              }
            },
            color: 'red',
          },
        },
        {
          label: 'Пришли',
          data: [5, 15, 10, 12, 18, 7, 9],
          borderColor: '#80D593',
          backgroundColor: '#80D593',
          fill: true,
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value: any, ctx: any) => {
              if (ctx.dataIndex === 0) {return ''}
              const diff = value - data.datasets[1].data[ctx.dataIndex - 1];
              if (diff > 0) {
                return '+' + diff;
              } else {
                return diff;
              }
            },
            color: 'black',
          },
        },
        {
          label: 'Штат',
          data: [60, 65, 68, 70, 75, 72, 80],
          borderColor: '#D1FEDE',
          backgroundColor: '#D1FEDE',
          fill: true,
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value: any, ctx: any) => {
              if (ctx.dataIndex === 0) {
                return ''; // No data for the first month, so no percentage calculation
              } else {
                const prevValue = data.datasets[2].data[ctx.dataIndex - 1];
                const diff = value - prevValue;
                const percentage = ((diff / prevValue) * 100).toFixed(2);

                return diff !== 0 ? (diff > 0 ? `+${percentage}%` : `${percentage}%`) : '';
              }
            },
            color: function (ctx: any) {
              const index = ctx.dataIndex;
              const prevValue = data.datasets[2].data[index - 1];
              const currentValue = data.datasets[2].data[index];
              return currentValue > prevValue ? 'green' : 'red';
            },
          },
        },
      ],
    };

    Chart.register(ChartDataLabels);

    const lineChart = new Chart(ctx!, {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            backgroundColor: 'transparent',
            borderRadius: 4,
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
        },
      },
    });
  }
}

bootstrapApplication(App);
