import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { Player } from './Player'
import { Elevator } from './Elevator'
import { Floor } from './Floor'

export const Scene = () => {
	return (
		<>
			<ambientLight intensity={0.6} />
			<directionalLight
				position={[5, 10, 7.5]}
				intensity={1}
				castShadow
			/>
			<OrbitControls />

			<Physics debug gravity={[0, -9.81, 0]}>
				<Floor position={[0, 0, 0]} holes={[7]} />
				<Floor position={[0, 3, 0]} holes={[7]} />
				<Elevator position={[2, 0, 0]} />
				<Player />
			</Physics>
		</>
	)
}
