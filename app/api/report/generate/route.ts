import fs from 'fs/promises';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import path from 'path';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(request: Request) {
  const reportId = randomUUID();

  let params;
  try {
    params = await request.json();
  } catch (err) {
    return new Response('Invalid request: Provide { reportIds: [...] }', { status: 400 });
  }

  const resultFolderPath = path.join(process.cwd(), `data/results`);
  const tempFolderPath = path.join(process.cwd(), `data/.tmp`);
  try {
    await fs.rm(tempFolderPath, { recursive: true, force: true });
  } catch (error) {
    console.log('temp folder not found, creating...');
  }
  await fs.mkdir(tempFolderPath, { recursive: true });

  for (const reportId of params.reportIds) {
    await fs.copyFile(
      `${resultFolderPath}/${reportId}.zip`,
      `${tempFolderPath}/${reportId}.zip`,
    );
  }

  execSync('npx playwright merge-reports --reporter html ./data/.tmp', {
    env: {
      ...process.env,
      PLAYWRIGHT_HTML_REPORT: `data/reports/${reportId}`,
    },
  });
  return Response.json({ reportId });
}
