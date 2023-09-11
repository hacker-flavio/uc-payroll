import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/PayrollChart.css";

interface LineChartProps {
  nums: { x: number; y: number }[]; // Update the type for nums and nums2
  labels: number[];
}

const LineChart: React.FC<LineChartProps> = ({ nums, labels }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById("line-chart") as HTMLCanvasElement;

    if (!ctx) {
      console.error("Canvas element not found!");
      return;
    }

    // Destroy the previous chart instance, if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "JAY SHARPING",
            data: nums.map((value) => ({ x: value.x, y: value.y })),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {},
      },
    });
  }, [nums, labels]);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <canvas id="line-chart" className="payroll-chart" />
    </div>
  );
};

export default LineChart;
