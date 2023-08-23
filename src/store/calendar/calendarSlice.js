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
    }
  }
})

export const {
  onSetActiveEvent
} = calendarSlice.actions

export default calendarSlice.reducer
