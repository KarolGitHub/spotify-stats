import React, { Component } from 'react';

import Chart from 'chart.js';
import './GenreChart.css';

// const reducer = (acc, cur) => acc + cur;
let gerneChart;
let genreNames = null;
let genreAmounts = null;
// let genreAmountsTotal;
let duration = 1000;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;

class GenreChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    if (this.props.animate) {
      duration = 800;
    } else {
      duration = 0;
    }
    const genreData = this.props.sortedGenres?.[0];
    if (typeof genreData === 'undefined') return;
    const myChartRef = this.chartRef.current.getContext('2d');
    if (genreData[1].length > 100) {
      genreAmounts = genreData[1].filter((x) => x > 3).slice(0, 15);
    } else {
      genreAmounts = genreData[1].slice(0, 15);
    }
    genreNames = genreData[0].slice(0, genreAmounts.length);
    // genreAmountsTotal = genreAmounts.reduce(reducer);

    if (typeof gerneChart !== 'undefined') gerneChart.destroy();

    gerneChart = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: genreNames,
        datasets: [
          {
            label: '',
            data: genreAmounts,
            backgroundColor: [
              'rgba(140, 230, 255, 0.9)',
              'rgba(133, 232, 118, 0.91)',
              'rgba(255, 255, 120, 1)',
              'rgba(255, 142, 128, 1)',
              'rgba(171, 116, 232, 0.91)',
              'rgba(100, 172, 232, 0.91)',
              'rgba(122, 252, 142, 1)',
              'rgba(232, 215, 102, 0.91)',
              'rgba(255, 149, 102, 1)',
              'rgba(214, 110, 255, 1)',
              'rgba(72, 237, 255, 1)',
              'rgba(105, 232, 56, 0.9)',
              'rgba(255, 200, 51, 0.9)',
              'rgba(255, 69, 59, 0.9)',
              'rgba(117, 53, 232, 0.6)',
            ],
            borderColor: ['rgba(255,255,255,1)'],
            borderWidth: 0.5,
            hoverBorderWidth: 6,
          },
        ],
      },
      options: {
        tooltips: {
          mode: 'index',
          cornerRadius: 6,
          bodyFontSize: 16,
          caretSize: 10,
          callbacks: {
            label: function (tooltipItems, data) {
              return (
                Math.round(
                  ((data.datasets[tooltipItems.datasetIndex].data[
                    tooltipItems.index
                  ] /
                    100) *
                    100 +
                    Number.EPSILON) *
                    100
                ) / 100
              );
            },
          },
        },
        animation: {
          duration: duration,
        },
      },
    });
  };

  render() {
    let chartHeader = `${this.props.chartDataType} chart`;
    let chart;

    if (this.props.sortedGenres) {
      chart = (
        <canvas
          width='100%'
          height='100%'
          id='genreChart'
          ref={this.chartRef}
        />
      );
    } else {
      chart = this.props.dataMessage;
    }

    return (
      <div className='chartContainer'>
        <h2>{chartHeader}</h2>
        {chart}
      </div>
    );
  }
}

export default GenreChart;
