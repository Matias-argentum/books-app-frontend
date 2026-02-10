import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark', // Arrancamos en oscuro por defecto
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
export default theme