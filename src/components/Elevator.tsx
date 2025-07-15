import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import {
	ELEVATOR_SPEED,
	ELEVATOR_PLATFORM_SIZE,
	FLOOR_HEIGHT,
} from '../config/gameConfig'

type ElevatorProps = {
	/** Position of the elevator in 3D space [x, y, z] */
	position: [number, number, number]
	/** Height between floors - defaults to FLOOR_HEIGHT from config */
	floorHeight?: number
}

/**
 * Elevator component that moves up when player enters and down when player exits
 * Uses physics-based collision detection to determine player presence
 */
export const Elevator = ({
	position,
	floorHeight = FLOOR_HEIGHT,
}: ElevatorProps) => {
	const elevatorRef = useRef<RapierRigidBody>(null)
	const [playerInside, setPlayerInside] = useState(false)

	// Calculate movement boundaries based on starting position
	const startingFloorY = position[1]
	const minHeight = startingFloorY // Bottom position (starting floor)
	const maxHeight = startingFloorY + floorHeight // Top position (next floor)

	/**
	 * Handle player entering the elevator collision area
	 */
	const handleCollisionEnter = () => {
		setPlayerInside(true)
	}

	/**
	 * Handle player leaving the elevator collision area
	 */
	const handleCollisionExit = () => {
		setPlayerInside(false)
	}

	// Animation loop for elevator movement
	useFrame(() => {
		if (!elevatorRef.current) return

		const currentPosition = elevatorRef.current.translation()

		// Move up when player is inside and not at max height
		if (playerInside && currentPosition.y < maxHeight) {
			elevatorRef.current.setTranslation(
				{
					x: currentPosition.x,
					y: currentPosition.y + ELEVATOR_SPEED,
					z: currentPosition.z,
				},
				true
			)
		}
		// Move down when player is not inside and not at min height
		else if (!playerInside && currentPosition.y > minHeight) {
			elevatorRef.current.setTranslation(
				{
					x: currentPosition.x,
					y: currentPosition.y - ELEVATOR_SPEED,
					z: currentPosition.z,
				},
				true
			)
		}
	})

	return (
		<group position={position}>
			{/* Kinematic rigid body that can be moved programmatically */}
			<RigidBody
				ref={elevatorRef}
				type="kinematicPosition"
				colliders="cuboid"
				onCollisionEnter={handleCollisionEnter}
				onCollisionExit={handleCollisionExit}
			>
				{/* Visual elevator platform mesh */}
				<mesh position={[0, -0.1, 0]} castShadow receiveShadow>
					<boxGeometry args={ELEVATOR_PLATFORM_SIZE} />
					<meshStandardMaterial color="#555" />
				</mesh>
			</RigidBody>
		</group>
	)
}
