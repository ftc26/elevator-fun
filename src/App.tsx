import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'

export const App = () => (
	<Canvas
		className="fullscreen-canvas"
		shadows
		camera={{ position: [0, 5, 10], fov: 60 }}
	>
		<Scene />
	</Canvas>
)
