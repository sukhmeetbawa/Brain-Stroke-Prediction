import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series, labels }) => {
  // Define the chart options
  const options = {
    chart: {
      type: "donut",
    },
    series: series,
    labels: labels,
    responsive: [
      {
        breakpoint: 480, // Set a breakpoint for mobile devices
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Roboto, Arial, sans-serif",
      fontWeight: 400,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  return (
    // Render the chart component
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={350}
    />
  );
};

export default DonutChart;
