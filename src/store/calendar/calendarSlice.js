import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
  _id: crypto.randomUUID(),
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Damian Soto'
  }
}

const initialState = {
  events: [tempEvent],
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
    }
  }
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent
} = calendarSlice.actions

export default calendarSlice.reducer
