import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'

/**
 * Root application component
 * Sets up the Three.js canvas with shadows and camera configuration
 */
export const App = () => (
	<Canvas
		className="fullscreen-canvas"
		shadows // Enable shadow rendering
		camera={{ position: [0, 5, 10], fov: 60 }} // Initial camera position and field of view
	>
		<Scene />
	</Canvas>
)
