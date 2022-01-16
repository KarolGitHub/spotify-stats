import React, { Component } from 'react';

import Chart from 'chart.js';
import './ArtistsChart.css';

// const reducer = (acc, cur) => acc + cur;
let artistsChart;
let artistsNames = null;
let artistsAmounts = null;
// let artistsAmountsTotal;
let duration = 1000;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;

class ArtistsChart extends Component {
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

    const artistsData = this.props.sortedArtists;
    if (!artistsData.length) return;
    const myChartRef = this.chartRef.current.getContext('2d');
    if (artistsData[1]?.length > 100) {
      artistsAmounts = artistsData[0].filter((x) => x > 3).slice(0, 15);
    } else {
      artistsAmounts = artistsData[0].slice(0, 15);
    }
    artistsAmounts = artistsAmounts.map((artist) => artist.popularity);

    artistsNames = artistsData[0].slice(0, artistsAmounts.length);
    artistsNames = artistsNames.map((artist) => artist.name);
    // artistsAmountsTotal = artistsAmounts.reduce(reducer);

    if (typeof artistsChart !== 'undefined') artistsChart.destroy();

    artistsChart = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: artistsNames,
        datasets: [
          {
            label: '',
            data: artistsAmounts,
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

    if (this.props.sortedArtists) {
      chart = (
        <canvas
          width='100%'
          height='100%'
          id='artistsChart'
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

export default ArtistsChart;
