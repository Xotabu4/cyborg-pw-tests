import fs from "fs/promises";

import path from "path";
import { request } from "@playwright/test";
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
} from "@playwright/test/reporter";

class PwReportsServerReporter implements Reporter {
  config: FullConfig;
  onBegin(config: FullConfig, suite: Suite) {
    this.config = config;
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  async onEnd(result: FullResult) {
    const blobReporterConfig = this.config.reporter.find((r) => r[0] === "blob");
    if (blobReporterConfig === undefined) { 
      console.error("Blob reporter config not found, blob reporter is required for this reporter to work. Results will not be uploaded.");
      return;
    }
    const testResults = blobReporterConfig[1];
    const testResultPath = path.join(
      process.cwd(),
      testResults.outputDir,
      testResults.fileName
    );
    const buffer = await fs.readFile(testResultPath);
    const ctx = await request.newContext();
    const resp = await ctx.put("http://localhost:3000/api/result/upload", {
      multipart: {
        file: {
          name: testResults.fileName,
          mimeType: "application/zip",
          buffer: buffer,
        },
        name: "10-mar-pw-workshop",
      },
    });

    const { data } = await resp.json();

    console.log(data);

    const report = await (
      await ctx.post("http://localhost:3000/api/report/generate", {
        data: {
          resultsIds: [data.resultID],
        },
      })
    ).json();
    
    console.log(
        `🎭 HTML Report is available at: http://localhost:3000/${report.reportUrl}`
    )
  }
}

export default PwReportsServerReporter;
