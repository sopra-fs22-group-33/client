const _data = {
  selectedSlot: false,
};


/**
 * Singleton for properties/values used by different components in a calendar
 *
 * @type {{getSelectedSlot: (function(id): boolean), setSelectedSlot: (function(): id)}}
 */
const CalendarGlobal = {
  setSelectedSlot: (id) => (_data.selectedSlot = id),
  getSelectedSlot: () => _data.selectedSlot,
};
Object.freeze(CalendarGlobal);
export default CalendarGlobal;
