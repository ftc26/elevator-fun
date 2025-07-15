/**
 * Game Configuration
 * Central configuration file for all game constants and settings
 */

// =============================================================================
// FLOOR CONFIGURATION
// =============================================================================
/** Total number of floors in the game world */
export const FLOOR_COUNT = 4

/** Vertical distance between each floor */
export const FLOOR_HEIGHT = 3

/** Size of each individual floor tile */
export const TILE_SIZE = 2

/** Thickness/height of each floor tile */
export const TILE_HEIGHT = 0.2

/** Number of tiles per row/column (creates TILE_COUNT x TILE_COUNT grid) */
export const TILE_COUNT = 3

// =============================================================================
// HOLE CONFIGURATION
// =============================================================================
/** Maximum number of random fall-through holes per floor (excluding elevator holes) */
export const MAX_FALL_HOLES_PER_FLOOR = 2

// =============================================================================
// ELEVATOR CONFIGURATION
// =============================================================================
/** Speed at which elevators move between floors */
export const ELEVATOR_SPEED = 0.05

/** Dimensions of elevator platform [width, height, depth] */
export const ELEVATOR_PLATFORM_SIZE = [1.8, 0.3, 1.8] as const

// =============================================================================
// PLAYER CONFIGURATION
// =============================================================================
/** Player movement speed in units per frame */
export const PLAYER_SPEED = 5

/** Initial spawn position of the player [x, y, z] */
export const PLAYER_INITIAL_POSITION: [number, number, number] = [0, 0.7, 0]

/** Visual capsule dimensions [radius, height] */
export const PLAYER_CAPSULE_SIZE: [number, number] = [0.35, 0.35]

/** Physics collider dimensions [halfHeight, radius] - slightly smaller than visual */
export const PLAYER_COLLIDER_SIZE: [number, number] = [0.25, 0.45]

// =============================================================================
// CAMERA CONFIGURATION
// =============================================================================
/** Camera position offset relative to player */
export const CAMERA_OFFSET = { x: 0, y: 4, z: 8 }

/** Speed of camera interpolation when following player (0-1, higher = faster) */
export const CAMERA_LERP_SPEED = 0.1

// =============================================================================
// PHYSICS CONFIGURATION
// =============================================================================
/** Gravity vector [x, y, z] - standard Earth gravity */
export const GRAVITY: [number, number, number] = [0, -9.81, 0]

// =============================================================================
// LIGHTING CONFIGURATION
// =============================================================================
/** Intensity of ambient light (general scene illumination) */
export const AMBIENT_LIGHT_INTENSITY = 0.6

/** Position of directional light [x, y, z] */
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [5, 10, 7.5]

/** Intensity of directional light (shadows and highlights) */
export const DIRECTIONAL_LIGHT_INTENSITY = 1

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Converts a tile index to world coordinates
 * @param tileIndex - Index of the tile (0 to TILE_COUNT^2 - 1)
 * @returns Object with x and z world coordinates
 */
export const getTilePosition = (
	tileIndex: number
): { x: number; z: number } => {
	const row = Math.floor(tileIndex / TILE_COUNT)
	const col = tileIndex % TILE_COUNT

	// Calculate world position with center at origin
	const x = row * TILE_SIZE - (TILE_COUNT * TILE_SIZE) / 2 + TILE_SIZE / 2
	const z = col * TILE_SIZE - (TILE_COUNT * TILE_SIZE) / 2 + TILE_SIZE / 2

	return { x, z }
}

/**
 * Generates random elevator positions for each floor using Fisher-Yates shuffle
 * Ensures no two consecutive floors have elevators at the same position
 * @param floorCount - Number of floors to generate positions for
 * @returns Array of tile indices representing elevator positions
 */
export const generateElevatorPositions = (floorCount: number): number[] => {
	const totalTiles = TILE_COUNT * TILE_COUNT

	// Create array with all possible tile indices [0, 1, 2, ..., totalTiles-1]
	const allTileIndices = Array.from({ length: totalTiles }, (_, i) => i)

	// Shuffle using Fisher-Yates algorithm for random distribution
	for (let i = allTileIndices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[allTileIndices[i], allTileIndices[j]] = [
			allTileIndices[j],
			allTileIndices[i],
		]
	}

	// Return only the number of positions needed for the floors
	return allTileIndices.slice(0, floorCount)
}

// =============================================================================
// GENERATED CONFIGURATIONS
// =============================================================================

/** Pre-generated elevator positions for each floor (randomly shuffled at startup) */
export const ELEVATOR_POSITIONS = generateElevatorPositions(FLOOR_COUNT)
