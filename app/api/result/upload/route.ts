import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function PUT(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file') as File;
  // TODO: here is place to define additional fields
  const name = formData.get('name');
  if (!file) {
    return Response.json({ error: 'No files received.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resultID = randomUUID();

  try {
    const resultFolderPath = path.join(
      process.cwd(),
      `data/results`,
    );
    await mkdir(resultFolderPath, {
      recursive: true,
    });
    await writeFile(`${resultFolderPath}/${resultID}.zip`, buffer);

    const metaData = {
      resultID,
      createdAt: new Date().toISOString(),
    };
    await writeFile(
      `${resultFolderPath}/${resultID}.json`,
      Buffer.from(
        JSON.stringify(metaData, null, 2),
      ),
    );
    return Response.json({
      message: 'Success',
      data: metaData,
      status: 201,
    });
  } catch (error) {
    console.log('Error occured ', error);
    return Response.json({
      message: 'Failed',
      data: {
        error: (error as Error).message,
      },
      status: 500,
    });
  }
}
