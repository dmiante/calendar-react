import { createSlice } from '@reduxjs/toolkit'

// const tempEvent = {
//   _id: crypto.randomUUID(),
//   title: 'Cumpleaños del jefe',
//   notes: 'Hay que comprar el pastel',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Damian Soto'
//   }
// }

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload
        }
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id)
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      // state.events = payload
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id)
        if (!exists) {
          state.events.push(event)
        }
      })
    }
  }
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents
} = calendarSlice.actions

export default calendarSlice.reducer
