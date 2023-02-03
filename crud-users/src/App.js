import React from 'react'
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import Home from './components/Home'
makeStyles({ root: {} })
const App = () => {
  const theme = createTheme({
    palette: {
      primary: { main: '#006974' },
      secondary: { main: '#015f92' }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: { border: '2px solid #000' }
  })
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}
export default App