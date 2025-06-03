import { spawn, ChildProcess } from 'child_process';
import http from 'http';

export async function startServer(port: number, appBuildPath: string): Promise<ChildProcess> {
  const server = spawn('npx', ['serve', '-s', appBuildPath, '-l', port.toString()], { stdio: 'inherit' });
  await waitForServer(port);
  return server;
}

async function waitForServer(port: number, maxAttempts = 10): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        http.get(`http://localhost:${port}`, (res) => {
          if (res.statusCode === 200) {
            console.log('Server is ready!');
            resolve();
          } else {
            reject(new Error(`Server returned ${res.statusCode}`));
          }
        }).on('error', reject);
      });
      return;
    } catch (err) {
      if (i === maxAttempts - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
} 