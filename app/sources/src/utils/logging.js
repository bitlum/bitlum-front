/**
 * Setup logging utilities
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const loglevel = require('loglevel');

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const colors = {
  trace: '',
  debug: '\x1b[90m',
  info: '\x1b[94m',
  warn: '\x1b[93m',
  error: '\x1b[91m',
};

const originalFactory = loglevel.methodFactory;
loglevel.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return message => {
    // Getting stacktrace
    const err = new Error();
    const callerLine = err.stack.split('\n')[2];
    let invokeLocation = callerLine.match(/\(\/.*\)/);
    if (invokeLocation) {
      // Removing () brackets around line and replace core folder
      // where app is stored inside Docker container
      invokeLocation = invokeLocation[0].slice(1, -1).replace('/opt/app', '');
    } else {
      invokeLocation = '';
    }

    let prefix = '';
    if (process.env.NODE_ENV === 'development') {
      prefix = `${colors[methodName]}[${new Date()
        .toTimeString()
        .replace(
          /.*(\d{2}:\d{2}:\d{2}).*/,
          '$1',
        )}] ${methodName.toUpperCase()}(${loggerName})[${invokeLocation}]:\x1b[0m`;
    } else {
      prefix = `${methodName.toUpperCase()}(${loggerName})[${invokeLocation}]:`;
    }

    if (message === undefined) {
      return rawMethod(prefix, message);
    }
    let formattedMessage = message;

    if (message.stack && process.env.NODE_ENV === 'production') {
      formattedMessage = `${message.stack.replace(/\n/g, '')}`;
    }

    if (methodName === 'error') {
      let errorObject = message.error || message;
      if (typeof errorObject === 'string' || errorObject instanceof String) {
        formattedMessage = errorObject;
      } else {
        const stackWithoutMessage =
          (errorObject.stack &&
            errorObject.stack
              .split('\n')
              .slice(1)
              .join('\n')) ||
          '';

        const stack =
          process.env.NODE_ENV === 'production'
            ? stackWithoutMessage.replace(/\n/g, '')
            : `\n${stackWithoutMessage}`;
        if (errorObject instanceof Error) {
          // In case someone stringifyed error object as you can in Bull queue
          try {
            errorObject = JSON.parse(errorObject.message);
            errorObject = errorObject.error || errorObject;
          } catch (e) {}
        }
        formattedMessage = `${errorObject.message} (${errorObject.code || 0}) ${stack}`;
      }
    }

    return rawMethod(prefix, formattedMessage);
  };
};

if (process.env.NODE_ENV === 'development') {
  loglevel.setDefaultLevel(loglevel.levels.DEBUG);
  loglevel.setLevel(loglevel.levels.DEBUG);
}
if (process.env.NODE_ENV === 'production') {
  loglevel.setDefaultLevel(loglevel.levels.INFO);
  loglevel.setLevel(loglevel.levels.INFO);
}
if (process.env.NODE_ENV === 'test') {
  loglevel.setDefaultLevel(loglevel.levels.SILENT);
  loglevel.setLevel(loglevel.levels.SILENT);
}

const internalLogger = loglevel.getLogger('Logger');

export default name => ({ ...loglevel.getLogger(name || 'general') });
