/**
 * Log toolkit
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const log = new Proxy(
  {
    level: 'warn',
    levels: ['debug', 'info', 'warn', 'error'],
    levelColors: {
      debug: '#9E9E9E',
      info: '#03A9F4',
      warn: '#FF9800',
      error: '#FF3D00',
    },
    traceType: 'off',
  },
  {
    get(settings, prop) {
      if (settings.levels.includes(prop)) {
        const invokedLevel = prop;
        return (...args) => {
          const messages = [];
          args.forEach(arg => {
            if (typeof arg === 'string') {
              messages.push(`%c${arg}`, `color:${settings.levelColors[invokedLevel]}`);
            } else {
              messages.push(arg);
            }
          });

          if (settings.levels.indexOf(invokedLevel) >= settings.levels.indexOf(settings.level)) {
            console.log(...messages);
          }
          if (settings.traceType === 'full') {
            console.trace();
          }
          if (settings.traceType === 'part') {
            console.log(new Error().stack.split('\n')[2]);
          }
        };
      }
      return settings[prop];
    },
    set(settings, prop, value) {
      settings[prop] = value; // eslint-disable-line
      return true;
    },
  },
);

if (process.env.NODE_ENV === 'development') {
  log.level = 'debug';
}

export default log;
