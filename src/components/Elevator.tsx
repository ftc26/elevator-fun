import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'

type ElevatorProps = {
	position: [number, number, number]
}

const maxHeight = 3
const minHeight = 0
const speed = 0.02

export const Elevator = ({ position }: ElevatorProps) => {
	const elevatorRef = useRef<RapierRigidBody>(null)
	const [playerInside, setPlayerInside] = useState(false)

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
					y: currentPosition.y + speed,
					z: currentPosition.z,
				},
				true
			)
		} else if (!playerInside && currentPosition.y > minHeight) {
			elevatorRef.current.setTranslation(
				{
					x: currentPosition.x,
					y: currentPosition.y - speed,
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
					<boxGeometry args={[1.8, 0.2, 1.8]} />
					<meshStandardMaterial color="#555" />
				</mesh>
			</RigidBody>
		</group>
	)
}
