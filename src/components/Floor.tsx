import { RigidBody } from '@react-three/rapier'

type FloorProps = {
	position: [number, number, number]
	holes?: number[] // optional array of hole indices
}

const tileSize = 2 // size of each tile
const tileHeight = 0.2 // height of each tile
const tileCount = 3 // number of tiles in each row/column
const wallHeight = 2 // height of invisible walls
const wallThickness = 0.1 // thickness of invisible walls

export const Floor = ({ position, holes }: FloorProps) => (
	<group position={position}>
		{/* Floor tiles */}
		{Array.from({ length: tileCount }).map((_, i) =>
			Array.from({ length: tileCount }).map(
				(_, j) =>
					// if the current tile index is in the holes array, skip rendering it
					!holes?.includes(i * tileCount + j) && (
						<RigidBody
							key={`tile-${i}-${j}`}
							type="fixed"
							colliders="cuboid"
						>
							<mesh
								position={[
									i * tileSize -
										(tileCount * tileSize) / 2 +
										tileSize / 2,
									-tileHeight / 2, // position the tile at the correct height
									j * tileSize -
										(tileCount * tileSize) / 2 +
										tileSize / 2,
								]}
								receiveShadow
							>
								<boxGeometry
									args={[tileSize, tileHeight, tileSize]}
								/>
								<meshStandardMaterial color="#eee" />
							</mesh>
						</RigidBody>
					)
			)
		)}

		{/* Invisible walls around the floor */}
		{/* North wall */}
		<RigidBody type="fixed" colliders="cuboid">
			<mesh
				position={[
					0,
					wallHeight / 2,
					(tileCount * tileSize) / 2 + wallThickness / 2,
				]}
			>
				<boxGeometry
					args={[tileCount * tileSize, wallHeight, wallThickness]}
				/>
				<meshStandardMaterial color="red" transparent opacity={0} />
			</mesh>
		</RigidBody>

		{/* South wall */}
		<RigidBody type="fixed" colliders="cuboid">
			<mesh
				position={[
					0,
					wallHeight / 2,
					-(tileCount * tileSize) / 2 - wallThickness / 2,
				]}
			>
				<boxGeometry
					args={[tileCount * tileSize, wallHeight, wallThickness]}
				/>
				<meshStandardMaterial color="red" transparent opacity={0} />
			</mesh>
		</RigidBody>

		{/* East wall */}
		<RigidBody type="fixed" colliders="cuboid">
			<mesh
				position={[
					(tileCount * tileSize) / 2 + wallThickness / 2,
					wallHeight / 2,
					0,
				]}
			>
				<boxGeometry
					args={[wallThickness, wallHeight, tileCount * tileSize]}
				/>
				<meshStandardMaterial color="red" transparent opacity={0} />
			</mesh>
		</RigidBody>

		{/* West wall */}
		<RigidBody type="fixed" colliders="cuboid">
			<mesh
				position={[
					-(tileCount * tileSize) / 2 - wallThickness / 2,
					wallHeight / 2,
					0,
				]}
			>
				<boxGeometry
					args={[wallThickness, wallHeight, tileCount * tileSize]}
				/>
				<meshStandardMaterial color="red" transparent opacity={0} />
			</mesh>
		</RigidBody>
	</group>
)
