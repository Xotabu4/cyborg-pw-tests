import fs from 'fs/promises';
import path from 'path';

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const resultsDirPath = path.join(process.cwd(), 'data/results');
  const files = await fs.readdir(resultsDirPath);
  const jsonFiles = files.filter(file => path.extname(file) === '.json');

  const fileContents = await Promise.all(jsonFiles.map(async (file) => {
    const filePath = path.join(resultsDirPath, file);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }));

  return Response.json({ results: fileContents });
}