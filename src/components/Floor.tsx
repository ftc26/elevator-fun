import { RigidBody } from '@react-three/rapier'
import {
	TILE_SIZE,
	TILE_HEIGHT,
	TILE_COUNT,
	FLOOR_HEIGHT,
} from '../config/gameConfig'

type FloorProps = {
	/** Position of the floor in 3D space [x, y, z] */
	position: [number, number, number]
	/** Array of tile indices where holes should be created (no tiles rendered) */
	holes?: number[]
}

/**
 * Floor component that renders a grid of tiles with optional holes
 * Also includes invisible walls around the perimeter for collision boundaries
 */
export const Floor = ({ position, holes }: FloorProps) => (
	<group position={position}>
		{/* Generate floor tiles in a grid pattern */}
		{Array.from({ length: TILE_COUNT }).map((_, row) =>
			Array.from({ length: TILE_COUNT }).map((_, col) => {
				const tileIndex = row * TILE_COUNT + col

				// Skip rendering tiles where holes should be
				if (holes?.includes(tileIndex)) {
					return null
				}

				return (
					<RigidBody
						key={`tile-${row}-${col}`}
						type="fixed"
						colliders="cuboid"
					>
						<mesh
							position={[
								// Calculate tile position in world space
								row * TILE_SIZE -
									(TILE_COUNT * TILE_SIZE) / 2 +
									TILE_SIZE / 2,
								-TILE_HEIGHT / 2, // Position tile at correct height
								col * TILE_SIZE -
									(TILE_COUNT * TILE_SIZE) / 2 +
									TILE_SIZE / 2,
							]}
							receiveShadow
						>
							<boxGeometry
								args={[TILE_SIZE, TILE_HEIGHT, TILE_SIZE]}
							/>
							<meshStandardMaterial color="#eee" />
						</mesh>
					</RigidBody>
				)
			})
		)}

		{/* Invisible boundary walls around the floor perimeter */}
		{[
			// North wall (positive Z)
			{
				position: [
					0,
					FLOOR_HEIGHT / 2,
					(TILE_COUNT * TILE_SIZE) / 2 + TILE_HEIGHT / 2,
				],
				args: [TILE_COUNT * TILE_SIZE, FLOOR_HEIGHT, TILE_HEIGHT],
			},
			// South wall (negative Z)
			{
				position: [
					0,
					FLOOR_HEIGHT / 2,
					-(TILE_COUNT * TILE_SIZE) / 2 - TILE_HEIGHT / 2,
				],
				args: [TILE_COUNT * TILE_SIZE, FLOOR_HEIGHT, TILE_HEIGHT],
			},
			// East wall (positive X)
			{
				position: [
					(TILE_COUNT * TILE_SIZE) / 2 + TILE_HEIGHT / 2,
					FLOOR_HEIGHT / 2,
					0,
				],
				args: [TILE_HEIGHT, FLOOR_HEIGHT, TILE_COUNT * TILE_SIZE],
			},
			// West wall (negative X)
			{
				position: [
					-(TILE_COUNT * TILE_SIZE) / 2 - TILE_HEIGHT / 2,
					FLOOR_HEIGHT / 2,
					0,
				],
				args: [TILE_HEIGHT, FLOOR_HEIGHT, TILE_COUNT * TILE_SIZE],
			},
		].map((wall, index) => (
			<RigidBody key={`wall-${index}`} type="fixed" colliders="cuboid">
				{/* Invisible collision mesh (transparent material) */}
				<mesh position={wall.position as [number, number, number]}>
					<boxGeometry args={wall.args as [number, number, number]} />
					<meshStandardMaterial color="red" transparent opacity={0} />
				</mesh>
			</RigidBody>
		))}
	</group>
)
