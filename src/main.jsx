import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  ChakraProvider,
  createSystem,
  defineConfig,
  defaultConfig,
} from '@chakra-ui/react'

const config = defineConfig({})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
