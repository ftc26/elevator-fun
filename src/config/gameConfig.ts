// Game configuration constants

// Floor settings
export const FLOOR_COUNT = 4 // Adjustable number of floors
export const FLOOR_HEIGHT = 3 // Height between floors
export const TILE_SIZE = 2 // Size of each floor tile
export const TILE_HEIGHT = 0.2 // Height of each floor tile
export const TILE_COUNT = 3 // Number of tiles in each row/column (3x3 grid)

// Hole settings
export const MAX_FALL_HOLES_PER_FLOOR = 2 // Maximum number of fall-down holes per floor

// Elevator settings
export const ELEVATOR_SPEED = 0.03 // Speed of elevator movement
export const ELEVATOR_PLATFORM_SIZE = [1.8, 0.2, 1.8] as const // [width, height, depth]
export const ELEVATOR_SENSOR_SIZE = [2.2, 1.5, 2.2] as const // [width, height, depth] for collision detection

// Player settings
export const PLAYER_SPEED = 5 // Player movement speed
export const PLAYER_INITIAL_POSITION: [number, number, number] = [0, 0.7, 0] // Player starting position [x, y, z]
export const PLAYER_CAPSULE_SIZE: [number, number] = [0.35, 0.35] // [radius, height] for visual capsule
export const PLAYER_COLLIDER_SIZE: [number, number] = [0.25, 0.45] // [halfHeight, radius] for physics collider

// Camera settings
export const CAMERA_OFFSET = { x: 0, y: 4, z: 8 } // Camera position relative to player
export const CAMERA_LERP_SPEED = 0.1 // Camera follow smoothness

// Physics settings
export const GRAVITY: [number, number, number] = [0, -9.81, 0] // Gravity vector [x, y, z]

// Lighting settings
export const AMBIENT_LIGHT_INTENSITY = 0.6 // Ambient light intensity
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [5, 10, 7.5] // Directional light position [x, y, z]
export const DIRECTIONAL_LIGHT_INTENSITY = 1 // Directional light intensity

// Helper function to convert tile index to world coordinates
export const getTilePosition = (tileIndex: number): { x: number, z: number } => {
	const row = Math.floor(tileIndex / TILE_COUNT)
	const col = tileIndex % TILE_COUNT
	const x = row * TILE_SIZE - (TILE_COUNT * TILE_SIZE) / 2 + TILE_SIZE / 2
	const z = col * TILE_SIZE - (TILE_COUNT * TILE_SIZE) / 2 + TILE_SIZE / 2
	return { x, z }
}

// Generate random elevator positions for each floor
export const generateElevatorPositions = (floorCount: number): number[] => {
	const totalTiles = TILE_COUNT * TILE_COUNT
	
	// Create array with all possible tile indices [0, 1, 2, 3, 4, 5, 6, 7, 8]
	const allTileIndices = Array.from({ length: totalTiles }, (_, i) => i)
	
	// Shuffle the array using Fisher-Yates algorithm
	for (let i = allTileIndices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[allTileIndices[i], allTileIndices[j]] = [allTileIndices[j], allTileIndices[i]]
	}
	
	// Return only the first floorCount positions
	return allTileIndices.slice(0, floorCount)
}

// Elevator positions on each floor (randomly generated based on floor count)
export const ELEVATOR_POSITIONS = generateElevatorPositions(FLOOR_COUNT)
