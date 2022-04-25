const _events = {};

/**
 * Framework for creating event topics, subscribing to topics and dispatching events
 *
 * @type {{dispatch: EventDispatcher.dispatch, createTopic: EventDispatcher.createTopic, subscribe: EventDispatcher.subscribe}}
 */
const EventDispatcher = {
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
Object.freeze(EventDispatcher);
export default EventDispatcher;
