const _events = [];


/**
 * @see CalendarEventDispatcher.js
 */
export const globalEventDispatcher = {
  createTopic: (eventName) => {
    if (!_events.hasOwnProperty(eventName)) {
      _events[eventName] = [];
    }
  },
  subscribe: (eventName, sub, func) => {
    _events[eventName].push({ sub, func });
  },
  dispatch: (eventName) => {
    // execute subscribed function on each observer
    for (const _ of _events[eventName]) {
      _.func.call(_.sub);
    }
  },
};
Object.freeze(globalEventDispatcher);
export default globalEventDispatcher;