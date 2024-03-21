import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function DELETE(request: Request) {
  const reqData = await request.json();
  const reportId = reqData.resultId;

  const resultPath = path.join(process.cwd(), 'app/data/results', reportId);

  try {
    await fs.unlink(`${resultPath}.json`);
    await fs.unlink(`${resultPath}.zip`);
    return Response.json({
      message: `Results files deleted successfully`,
      reportId,
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 404 });
  }
}
