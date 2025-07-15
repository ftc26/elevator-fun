import { RigidBody } from '@react-three/rapier'
import { TILE_SIZE, TILE_HEIGHT, TILE_COUNT, FLOOR_HEIGHT } from '../config/gameConfig'

type FloorProps = {
	position: [number, number, number]
	holes?: number[] // optional array of hole indices
}

export const Floor = ({ position, holes }: FloorProps) => (
	<group position={position}>
		{/* Floor tiles */}
		{Array.from({ length: TILE_COUNT }).map((_, i) =>
			Array.from({ length: TILE_COUNT }).map(
				(_, j) =>
					// if the current tile index is in the holes array, skip rendering it
					!holes?.includes(i * TILE_COUNT + j) && (
						<RigidBody
							key={`tile-${i}-${j}`}
							type="fixed"
							colliders="cuboid"
						>
							<mesh
								position={[
									i * TILE_SIZE -
										(TILE_COUNT * TILE_SIZE) / 2 +
										TILE_SIZE / 2,
									-TILE_HEIGHT / 2, // position the tile at the correct height
									j * TILE_SIZE -
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
			)
		)}

		{/* Invisible walls around the floor */}
		{[
			// North wall
			{
				position: [0, FLOOR_HEIGHT / 2, (TILE_COUNT * TILE_SIZE) / 2 + TILE_HEIGHT / 2],
				args: [TILE_COUNT * TILE_SIZE, FLOOR_HEIGHT, TILE_HEIGHT]
			},
			// South wall
			{
				position: [0, FLOOR_HEIGHT / 2, -(TILE_COUNT * TILE_SIZE) / 2 - TILE_HEIGHT / 2],
				args: [TILE_COUNT * TILE_SIZE, FLOOR_HEIGHT, TILE_HEIGHT]
			},
			// East wall
			{
				position: [(TILE_COUNT * TILE_SIZE) / 2 + TILE_HEIGHT / 2, FLOOR_HEIGHT / 2, 0],
				args: [TILE_HEIGHT, FLOOR_HEIGHT, TILE_COUNT * TILE_SIZE]
			},
			// West wall
			{
				position: [-(TILE_COUNT * TILE_SIZE) / 2 - TILE_HEIGHT / 2, FLOOR_HEIGHT / 2, 0],
				args: [TILE_HEIGHT, FLOOR_HEIGHT, TILE_COUNT * TILE_SIZE]
			}
		].map((wall, index) => (
			<RigidBody key={`wall-${index}`} type="fixed" colliders="cuboid">
				<mesh position={wall.position as [number, number, number]}>
					<boxGeometry args={wall.args as [number, number, number]} />
					<meshStandardMaterial color="red" transparent opacity={0} />
				</mesh>
			</RigidBody>
		))}
	</group>
)
