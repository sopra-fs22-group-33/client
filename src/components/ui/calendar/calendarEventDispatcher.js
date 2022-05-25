const _events = {};

/**
 * Framework for creating event topics, subscribing to topics and dispatching events
 *
 * @type {{dispatch: calendarEventDispatcher.dispatch, createTopic: calendarEventDispatcher.createTopic, subscribe: calendarEventDispatcher.subscribe}}
 */
const calendarEventDispatcher = {
  /**
   * Create new event type
   *
   * @param eventName{string}
   */
  createTopic: (eventName) => {
    if (!_events.hasOwnProperty(eventName)) {
      _events[eventName] = [];
    }
  },
  /**
   * Subscribe instance and method to an existing event
   *
   * @param eventName{string}
   * @param sub{object}
   * @param func{function}
   */
  subscribe: (eventName, sub, func) => {
    _events[eventName].push({ sub, func });
  },
  /**
   * Remove a topic with all subscribers
   *
   * @param eventName
   */
  clear: (eventName) => {
    delete _events[eventName];
  },
  /**
   * Dispatch event for all subscribers to catch
   *
   * @param eventName{string}
   */
  dispatch: (eventName) => {
    // execute subscribed function on each observer
    for (const _ of _events[eventName]) {
      _.func.call(_.sub);
    }
  },
};
Object.freeze(calendarEventDispatcher);
export default calendarEventDispatcher;
