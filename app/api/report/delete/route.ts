import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function DELETE(request: Request) {
  const reqData = await request.json();
  const reportId = reqData.reportId;

  const reportPath = path.join(process.cwd(), 'data/reports', reportId);

  try {
    await fs.unlink(reportPath);
    return Response.json({
      message: `Report deleted successfully`,
      reportId,
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 404 });
  }
}
