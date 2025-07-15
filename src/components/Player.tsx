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
	CAMERA_LERP_SPEED,
} from '../config/gameConfig'

/** Type for tracking pressed keys */
type KeysPressed = {
	[key: string]: boolean
}

/**
 * Player component with WASD movement controls and camera following
 * Uses physics-based movement and collision detection
 */
export const Player = () => {
	const playerRef = useRef<RapierRigidBody>(null)
	const camera = useThree((state) => state.camera)
	const keysPressed = useRef<KeysPressed>({})

	// Set up keyboard event listeners
	useEffect(() => {
		/**
		 * Handle key press - mark key as pressed
		 */
		const handleKeyDown = (e: KeyboardEvent) => {
			keysPressed.current[e.key.toLowerCase()] = true
		}

		/**
		 * Handle key release - mark key as not pressed
		 */
		const handleKeyUp = (e: KeyboardEvent) => {
			keysPressed.current[e.key.toLowerCase()] = false
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		// Cleanup event listeners on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	// Animation loop for movement and camera updates
	useFrame(() => {
		if (!playerRef.current) return

		// Calculate movement velocity based on pressed keys
		const velocity = { x: 0, z: 0 }

		// WASD movement controls
		if (keysPressed.current.w) velocity.z -= PLAYER_SPEED // Forward
		if (keysPressed.current.s) velocity.z += PLAYER_SPEED // Backward
		if (keysPressed.current.a) velocity.x -= PLAYER_SPEED // Left
		if (keysPressed.current.d) velocity.x += PLAYER_SPEED // Right

		// Apply horizontal movement while preserving vertical velocity (gravity)
		playerRef.current.setLinvel(
			{ x: velocity.x, y: playerRef.current.linvel().y, z: velocity.z },
			true
		)

		// Update camera to follow player smoothly
		const playerPosition = playerRef.current.translation()

		camera.position.lerp(
			{
				x: playerPosition.x + CAMERA_OFFSET.x,
				y: playerPosition.y + CAMERA_OFFSET.y,
				z: playerPosition.z + CAMERA_OFFSET.z,
			},
			CAMERA_LERP_SPEED
		)

		// Keep camera looking at player
		camera.lookAt(playerPosition.x, playerPosition.y, playerPosition.z)
	})

	return (
		<RigidBody
			ref={playerRef}
			position={PLAYER_INITIAL_POSITION}
			colliders={false} // Use custom collider
			lockRotations={true} // Prevent player from rotating/falling over
		>
			{/* Custom capsule collider for physics */}
			<CapsuleCollider args={PLAYER_COLLIDER_SIZE} />

			{/* Visual representation of the player */}
			<Capsule args={PLAYER_CAPSULE_SIZE} castShadow receiveShadow>
				<meshPhysicalMaterial
					color="cyan"
					metalness={0.2}
					roughness={0.3}
				/>
			</Capsule>
		</RigidBody>
	)
}
