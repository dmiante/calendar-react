import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'

export default function CalendarApp () {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
