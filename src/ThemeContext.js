import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  onClickThemeIcon: () => {},
})

export default ThemeContext