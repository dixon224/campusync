import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "../backend/.env" });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not found. Check backend/.env");
  process.exit(1);
}

const results = [];

async function benchmarkQuery(testName, queryFunction) {
  const start = performance.now();

  const data = await queryFunction();

  const end = performance.now();
  const timeMs = Number((end - start).toFixed(2));

  results.push({
    test: testName,
    time_ms: timeMs,
    documents_returned: Array.isArray(data) ? data.length : 1,
    date: new Date().toISOString(),
  });

  console.log(`${testName}: ${timeMs} ms`);
}

async function runBenchmarks() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    await benchmarkQuery("Find all users", async () => {
      return await db.collection("users").find({}).limit(100).toArray();
    });

    await benchmarkQuery("Find all messages", async () => {
      return await db.collection("messages").find({}).limit(100).toArray();
    });

    await benchmarkQuery("Find all classes", async () => {
      return await db.collection("classes").find({}).limit(100).toArray();
    });

    await benchmarkQuery("Find all schedules", async () => {
      return await db.collection("schedules").find({}).limit(100).toArray();
    });

    const rawResultsDir = path.join(process.cwd(), "raw-results");

    if (!fs.existsSync(rawResultsDir)) {
      fs.mkdirSync(rawResultsDir);
    }

    fs.writeFileSync(
      path.join(rawResultsDir, "mongo_results.json"),
      JSON.stringify(results, null, 2),
    );

    const csvHeader = "test,time_ms,documents_returned,date\n";
    const csvRows = results
      .map((r) => `${r.test},${r.time_ms},${r.documents_returned},${r.date}`)
      .join("\n");

    fs.writeFileSync(
      path.join(rawResultsDir, "mongo_results.csv"),
      csvHeader + csvRows,
    );

    console.log("MongoDB benchmark results saved.");
  } catch (error) {
    console.error("Benchmark failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

runBenchmarks();
