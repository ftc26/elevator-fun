import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import { ELEVATOR_SPEED, ELEVATOR_PLATFORM_SIZE, FLOOR_HEIGHT } from '../config/gameConfig'

type ElevatorProps = {
	position: [number, number, number]
	floorHeight?: number // Height between floors
}

export const Elevator = ({ position, floorHeight = FLOOR_HEIGHT }: ElevatorProps) => {
	const elevatorRef = useRef<RapierRigidBody>(null)
	const [playerInside, setPlayerInside] = useState(false)

	// Calculate min and max heights based on elevator's starting position
	const startingFloorY = position[1]
	const minHeight = startingFloorY
	const maxHeight = startingFloorY + floorHeight

	const handleCollisionEnter = () => {
		setPlayerInside(true)
	}

	const handleCollisionExit = () => {
		setPlayerInside(false)
	}

	useFrame(() => {
		if (!elevatorRef.current) return

		const currentPosition = elevatorRef.current.translation()

		if (playerInside && currentPosition.y < maxHeight) {
			elevatorRef.current.setTranslation(
				{
					x: currentPosition.x,
					y: currentPosition.y + ELEVATOR_SPEED,
					z: currentPosition.z,
				},
				true
			)
		} else if (!playerInside && currentPosition.y > minHeight) {
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
			<RigidBody
				ref={elevatorRef}
				type="kinematicPosition"
				colliders="cuboid"
				onCollisionEnter={handleCollisionEnter}
				onCollisionExit={handleCollisionExit}
			>
				<mesh position={[0, -0.1, 0]} castShadow receiveShadow>
					<boxGeometry args={ELEVATOR_PLATFORM_SIZE} />
					<meshStandardMaterial color="#555" />
				</mesh>
			</RigidBody>
		</group>
	)
}
