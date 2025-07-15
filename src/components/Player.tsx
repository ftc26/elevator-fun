import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Capsule } from '@react-three/drei'

import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'

import { 
	PLAYER_SPEED, 
	PLAYER_INITIAL_POSITION,
	PLAYER_CAPSULE_SIZE, 
	PLAYER_COLLIDER_SIZE,
	CAMERA_OFFSET,
	CAMERA_LERP_SPEED
} from '../config/gameConfig'

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

		if (keysPressed.current.w) velocity.z -= PLAYER_SPEED
		if (keysPressed.current.s) velocity.z += PLAYER_SPEED
		if (keysPressed.current.a) velocity.x -= PLAYER_SPEED
		if (keysPressed.current.d) velocity.x += PLAYER_SPEED

		playerRef.current.setLinvel(
			{ x: velocity.x, y: playerRef.current.linvel().y, z: velocity.z },
			true
		)

		const playerPosition = playerRef.current.translation()

		camera.position.lerp(
			{
				x: playerPosition.x + CAMERA_OFFSET.x,
				y: playerPosition.y + CAMERA_OFFSET.y,
				z: playerPosition.z + CAMERA_OFFSET.z,
			},
			CAMERA_LERP_SPEED
		)
		camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z)
	})

	return (
		<RigidBody
			ref={playerRef}
			position={PLAYER_INITIAL_POSITION}
			colliders={false}
			lockRotations={true}
		>
			<CapsuleCollider args={PLAYER_COLLIDER_SIZE} />
			<Capsule args={PLAYER_CAPSULE_SIZE}>
				<meshStandardMaterial color="blue" />
			</Capsule>
		</RigidBody>
	)
}
