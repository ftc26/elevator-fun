import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { Player } from './Player'
import { Elevator } from './Elevator'
import { Floor } from './Floor'
import { FLOOR_COUNT, FLOOR_HEIGHT, ELEVATOR_POSITIONS, GRAVITY, AMBIENT_LIGHT_INTENSITY, DIRECTIONAL_LIGHT_POSITION, DIRECTIONAL_LIGHT_INTENSITY, TILE_COUNT, getTilePosition, MAX_FALL_HOLES_PER_FLOOR } from '../config/gameConfig'

export const Scene = () => {
	// Generate floors, elevators, and holes
	const floors = Array.from({ length: FLOOR_COUNT }, (_, i) => {
		const floorY = i * FLOOR_HEIGHT
		const hasElevator = i < FLOOR_COUNT - 1 // No elevator on top floor
		
		// Cycle through positions if more floors than predefined positions
		const elevatorTileIndex = ELEVATOR_POSITIONS[i % ELEVATOR_POSITIONS.length]
		
		// Determine holes for this floor
		const holes: number[] = []
		
		// 1. If this floor has an elevator going up, add hole at elevator position
		if (hasElevator) {
			holes.push(elevatorTileIndex)
		}
		
		// 2. If there's an elevator coming from the floor below, add hole where it arrives
		if (i > 0) {
			const floorBelowElevatorTileIndex = ELEVATOR_POSITIONS[(i - 1) % ELEVATOR_POSITIONS.length]
			if (!holes.includes(floorBelowElevatorTileIndex)) {
				holes.push(floorBelowElevatorTileIndex)
			}
		}
		
		// 3. Add randomized fall-down holes at different positions (not where elevators are)
		if (i > 0) { // No fall-down holes on ground floor
			// Find all positions that are not used by elevators
			const usedPositions = new Set(holes)
			const availablePositions = []
			
			for (let tileIndex = 0; tileIndex < TILE_COUNT * TILE_COUNT; tileIndex++) {
				if (!usedPositions.has(tileIndex)) {
					availablePositions.push(tileIndex)
				}
			}
			
			// Shuffle available positions for randomness
			const shuffledPositions = [...availablePositions]
			for (let k = shuffledPositions.length - 1; k > 0; k--) {
				const j = Math.floor(Math.random() * (k + 1))
				;[shuffledPositions[k], shuffledPositions[j]] = [shuffledPositions[j], shuffledPositions[k]]
			}
			
			// Add fall holes up to the maximum limit
			for (let k = 0; k < Math.min(MAX_FALL_HOLES_PER_FLOOR, shuffledPositions.length); k++) {
				holes.push(shuffledPositions[k])
			}
		}
		
		const elevatorWorldPos = getTilePosition(elevatorTileIndex)
		
		return {
			floorIndex: i,
			floorY,
			holes,
			elevatorPosition: [elevatorWorldPos.x, floorY, elevatorWorldPos.z] as [number, number, number],
			hasElevator
		}
	})

	return (
		<>
			<ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
			<directionalLight
				position={DIRECTIONAL_LIGHT_POSITION}
				intensity={DIRECTIONAL_LIGHT_INTENSITY}
				castShadow
			/>
			<OrbitControls />

			<Physics debug gravity={GRAVITY}>
				{/* Generate floors */}
				{floors.map((floor) => (
					<Floor 
						key={`floor-${floor.floorIndex}`}
						position={[0, floor.floorY, 0]} 
						holes={floor.holes} 
					/>
				))}
				
				{/* Generate elevators (all floors except the top one) */}
				{floors
					.filter(floor => floor.hasElevator)
					.map((floor) => (
						<Elevator 
							key={`elevator-${floor.floorIndex}`}
							position={floor.elevatorPosition}
							floorHeight={FLOOR_HEIGHT}
						/>
					))
				}
				
				<Player />
			</Physics>
		</>
	)
}
