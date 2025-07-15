import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

/**
 * Application entry point
 * Renders the app in React's StrictMode for additional development checks
 */
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
