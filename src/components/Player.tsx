import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Capsule } from '@react-three/drei'

import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'

const SPEED = 5

type KeysPressed = {
	[key: string]: boolean
}

export const Player = () => {
	const playerRef = useRef<RapierRigidBody>(null)
	const camera = useThree((state) => state.camera)
	const keysPressed = useRef<KeysPressed>({})

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) =>
			(keysPressed.current[e.key.toLowerCase()] = true)
		const handleKeyUp = (e: KeyboardEvent) =>
			(keysPressed.current[e.key.toLowerCase()] = false)

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	useFrame(() => {
		if (!playerRef.current) return

		const velocity = { x: 0, z: 0 }

		if (keysPressed.current.w) velocity.z -= SPEED
		if (keysPressed.current.s) velocity.z += SPEED
		if (keysPressed.current.a) velocity.x -= SPEED
		if (keysPressed.current.d) velocity.x += SPEED

		playerRef.current.setLinvel(
			{ x: velocity.x, y: playerRef.current.linvel().y, z: velocity.z },
			true
		)

		const playerPosition = playerRef.current.translation()

		camera.position.lerp(
			{
				x: playerPosition.x,
				y: playerPosition.y + 4,
				z: playerPosition.z + 8,
			},
			0.1
		)
		camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z)
	})

	return (
		<RigidBody
			ref={playerRef}
			position={[0, 0.7, 0]}
			colliders={false}
			lockRotations={true}
		>
			<CapsuleCollider args={[0.25, 0.5]} />
			<Capsule args={[0.35, 0.7]}>
				<meshStandardMaterial color="blue" />
			</Capsule>
		</RigidBody>
	)
}
