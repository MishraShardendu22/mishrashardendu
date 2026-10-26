import './index.css'
import { render } from 'preact'
import { Toaster } from 'react-hot-toast'
import App from './app'
import { ThemeProvider } from './hooks/use-theme'

const appElement = document.getElementById('app')!
appElement.replaceChildren()

render(
  <ThemeProvider>
    <App />
    <Toaster position="top-right" />
  </ThemeProvider>,
  appElement
)
