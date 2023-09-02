import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
  nums: number[];
  labels: string[];
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
            label: "Line Chart",
            data: nums,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [nums, labels]);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <canvas id="line-chart" />
    </div>
  );
};

export default LineChart;
