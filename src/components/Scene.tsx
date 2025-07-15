import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { Player } from './Player'
import { Elevator } from './Elevator'
import { Floor } from './Floor'
import {
	FLOOR_COUNT,
	FLOOR_HEIGHT,
	ELEVATOR_POSITIONS,
	GRAVITY,
	AMBIENT_LIGHT_INTENSITY,
	DIRECTIONAL_LIGHT_POSITION,
	DIRECTIONAL_LIGHT_INTENSITY,
	TILE_COUNT,
	getTilePosition,
	MAX_FALL_HOLES_PER_FLOOR,
} from '../config/gameConfig'

/**
 * Main scene component that generates the 3D world with floors, elevators, and physics
 */
export const Scene = () => {
	// Generate floor configuration with elevators and holes
	const floors = Array.from({ length: FLOOR_COUNT }, (_, floorIndex) => {
		const floorY = floorIndex * FLOOR_HEIGHT
		const hasElevator = floorIndex < FLOOR_COUNT - 1 // No elevator on top floor

		// Cycle through predefined elevator positions if more floors than positions
		const elevatorTileIndex =
			ELEVATOR_POSITIONS[floorIndex % ELEVATOR_POSITIONS.length]

		// Calculate holes for this floor
		const holes: number[] = []

		// 1. Add hole where elevator goes up (if this floor has an elevator)
		if (hasElevator) {
			holes.push(elevatorTileIndex)
		}

		// 2. Add hole where elevator arrives from below (if not ground floor)
		if (floorIndex > 0) {
			const elevatorFromBelowIndex =
				ELEVATOR_POSITIONS[(floorIndex - 1) % ELEVATOR_POSITIONS.length]
			// Avoid duplicate holes at the same position
			if (!holes.includes(elevatorFromBelowIndex)) {
				holes.push(elevatorFromBelowIndex)
			}
		}

		// 3. Add randomized fall-through holes (except on ground floor)
		if (floorIndex > 0) {
			// Find all tile positions not occupied by elevators
			const occupiedPositions = new Set(holes)
			const availablePositions = Array.from(
				{ length: TILE_COUNT * TILE_COUNT },
				(_, tileIndex) => tileIndex
			).filter((tileIndex) => !occupiedPositions.has(tileIndex))

			// Shuffle available positions using Fisher-Yates algorithm
			for (let i = availablePositions.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[availablePositions[i], availablePositions[j]] = [
					availablePositions[j],
					availablePositions[i],
				]
			}

			// Add up to MAX_FALL_HOLES_PER_FLOOR random holes
			const fallHoleCount = Math.min(
				MAX_FALL_HOLES_PER_FLOOR,
				availablePositions.length
			)
			holes.push(...availablePositions.slice(0, fallHoleCount))
		}

		// Calculate elevator world position
		const elevatorWorldPos = getTilePosition(elevatorTileIndex)

		return {
			floorIndex,
			floorY,
			holes,
			elevatorPosition: [
				elevatorWorldPos.x,
				floorY,
				elevatorWorldPos.z,
			] as [number, number, number],
			hasElevator,
		}
	})

	return (
		<>
			{/* Ambient lighting for overall scene illumination */}
			<ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />

			{/* Directional light for shadows and depth */}
			<directionalLight
				position={DIRECTIONAL_LIGHT_POSITION}
				intensity={DIRECTIONAL_LIGHT_INTENSITY}
				castShadow
			/>

			{/* Camera controls for user interaction */}
			<OrbitControls />

			{/* Physics world with gravity and debug visualization */}
			<Physics debug gravity={GRAVITY}>
				{/* Render all floors with their respective holes */}
				{floors.map((floor) => (
					<Floor
						key={`floor-${floor.floorIndex}`}
						position={[0, floor.floorY, 0]}
						holes={floor.holes}
					/>
				))}

				{/* Render elevators for all floors except the top one */}
				{floors
					.filter((floor) => floor.hasElevator)
					.map((floor) => (
						<Elevator
							key={`elevator-${floor.floorIndex}`}
							position={floor.elevatorPosition}
							floorHeight={FLOOR_HEIGHT}
						/>
					))}

				{/* Player character */}
				<Player />
			</Physics>
		</>
	)
}
