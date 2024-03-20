import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const resultsDirPath = path.join(process.cwd(), 'data/reports');
  const dirents = await fs.readdir(resultsDirPath, { withFileTypes: true });

  const reports = await Promise.all(dirents
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const dirPath = path.join(resultsDirPath, dirent.name);
      const stats = await fs.stat(dirPath);
      return {
        id: dirent.name,
        createdAt: stats.birthtime,
      };
    }));

  return Response.json({ reports });
}
