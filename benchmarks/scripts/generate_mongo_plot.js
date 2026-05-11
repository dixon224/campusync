import fs from "fs";
import path from "path";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const width = 900;
const height = 500;

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

async function generatePlot() {
  const resultsPath = path.join(
    process.cwd(),
    "raw-results",
    "mongo_results.json",
  );

  if (!fs.existsSync(resultsPath)) {
    console.error("mongo_results.json not found. Run mongo benchmark first.");
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, "utf-8"));

  const labels = results.map((r) => r.test);
  const times = results.map((r) => r.time_ms);

  const configuration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "MongoDB Query Time (ms)",
          data: times,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "MongoDB Query Benchmark Results",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Time in milliseconds",
          },
        },
      },
    },
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

  const plotsDir = path.join(process.cwd(), "plots");

  if (!fs.existsSync(plotsDir)) {
    fs.mkdirSync(plotsDir);
  }

  fs.writeFileSync(path.join(plotsDir, "mongo_query_times.png"), imageBuffer);

  console.log("Plot generated: benchmarks/plots/mongo_query_times.png");
}

generatePlot();
