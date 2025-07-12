import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Import the new theming utilities for Chakra UI v3+
import { ChakraProvider, createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

// Define your custom theme configuration using defineConfig
const config = defineConfig({
  // Your custom theme properties go here.
  // For example, to add custom colors:
  // colors: {
  //   brand: {
  //     50: '#E6FFFA',
  //     100: '#B2F5EA',
  //     // ... other shades
  //     900: '#1A202C',
  //   },
  // },
  // If you don't have any customizations, you can leave this empty for now
  // and simply use defaultConfig.
});

// Create the system with the default config and your custom config
const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* In Chakra UI v3+, ChakraProvider uses the 'value' prop for the system */}
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)