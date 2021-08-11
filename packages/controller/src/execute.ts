import { exec } from 'child_process';

var commandRunning = false;

const execAsPromise = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stout, sterr) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

export async function execute(command: string): Promise<void> {
  if (commandRunning) {
    return Promise.reject("A command is being executed right now");
  }

  commandRunning = true;

  try {
    await execAsPromise(command);
  } finally {
    commandRunning = false;
  }
}
