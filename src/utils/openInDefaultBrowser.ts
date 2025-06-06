function openInDefaultBrowser(url: string) {
  const { exec } = require('child_process');
  const os = require('os');

  const currentPlatform = os.platform();
  const commands = {
    darwin: `open "${url}"`,
    win32: `start "" "${url}"`,
    linux: `xdg-open "${url}"`,
  };

  const command = commands[currentPlatform as keyof typeof commands];
  if (command) exec(command);
}

export default openInDefaultBrowser;