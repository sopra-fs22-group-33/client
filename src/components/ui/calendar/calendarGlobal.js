const _data = {
  selectedSlot: false,
};


/**
 * Singleton for properties/values used by different components in a calendar
 *
 * @type {{getSelectedSlot: (function(id): boolean), setSelectedSlot: (function(): id)}}
 */
const calendarGlobal = {
  setSelectedSlot: (id) => (_data.selectedSlot = id),
  getSelectedSlot: () => _data.selectedSlot,
};
Object.freeze(calendarGlobal);
export default calendarGlobal;
