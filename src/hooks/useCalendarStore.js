import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice'
import calendarApi from '../api/calendarApi'
import { convertDateEvents } from '../helpers/convertDateEvents'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      // updating
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // creating
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    }
  }

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent())
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error loading events')
      console.error(error)
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
