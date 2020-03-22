import pino from 'pino';
import stream from 'stream';
import loggingProcess from 'child_process';

// Create a pass-stream that wil receive the logs
const logThrough = new stream.PassThrough();

// connect the stream to receive pino logging
const log = pino(
  {
    name: `bakitup-${process.env.APP_ID}`,
    level: process.env.LOG_LEVEL || 'info',
  },
  logThrough
);

// Environment variables
const cwd = process.cwd();
const { env } = process;
const logPath = `${cwd}/log`;

//spawn a child logging process which will receive the logs and spray them to multiple files
const child = loggingProcess.spawn(
  process.execPath,
  [
    require.resolve('pino-tee'),
    'trace',
    `${logPath}/all.log`,
    'warn',
    `${logPath}/warn.log`,
    'error',
    `${logPath}/error.log`,
    'fatal',
    `${logPath}/fatal.log`,
  ],
  { cwd, env }
);

//pipe the passthrough logs to the child process
logThrough.pipe(child.stdin);

// Log messages to console (optional, for development purposes only)
logThrough.pipe(process.stdout);

export default log;
