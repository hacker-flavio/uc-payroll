import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/PayrollChart.css";

interface LineChartProps {
  nums: { x: number; y: number }[]; // Update the type for nums and nums2
  labels: number[];
  name: string;
}

const LineChart: React.FC<LineChartProps> = ({ nums, labels, name }) => {
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
            label: name,
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
  }, [nums, labels, name]);

  return <canvas id="line-chart" className="payroll-chart" />;
};

// export default LineChart;
export default React.memo(LineChart);
