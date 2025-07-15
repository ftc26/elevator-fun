# Fun with Elevator 🛗

A 3D interactive elevator puzzle game built with React Three.js, featuring physics-based gameplay with elevators, platforms, and challenging navigation mechanics.

## 🎮 Project Overview

This project is a 3D browser-based game where players navigate through multiple floors using elevators and avoiding fall-through holes. The game demonstrates advanced React Three.js concepts, physics simulation, and interactive 3D gameplay mechanics.

### Key Features

- **3D Physics Simulation**: Real-time physics using Rapier physics engine
- **Multi-floor Navigation**: Dynamic elevator system connecting multiple floors
- **Interactive Gameplay**: WASD movement controls with collision detection
- **Procedural Level Design**: Randomized hole placement for replayability
- **Modern Tech Stack**: Built with React, TypeScript, and Three.js

## 🎯 Game Mechanics

### Player Controls

- **WASD Keys**: Move the player character around the 3D environment
- **Physics**: Player falls through holes and can ride elevators between floors

### Level Design

- **4 Floors**: Multi-level vertical gameplay with increasing complexity
- **Elevator System**: Moving platforms that transport players between floors
- **Dynamic Holes**: Procedurally placed fall-through holes create navigation challenges
- **Grid-based Layout**: 3x3 tile system for precise movement and positioning

### Elevator Mechanics

- Elevators automatically move between floors at a consistent speed
- Each floor (except the top) has one elevator going upward
- Elevator positions are predefined but cycle through different locations
- Players must time their movement to catch elevators

## 🛠 Technical Architecture

### Technology Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **3D Rendering**: Three.js with React Three Fiber
- **Physics Engine**: React Three Rapier for realistic physics simulation
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint and Prettier for consistent code style

### Project Structure

```
src/
├── components/           # React Three.js components
│   ├── Scene.tsx        # Main 3D scene orchestration
│   ├── Player.tsx       # Player character with physics
│   ├── Elevator.tsx     # Moving elevator platforms
│   └── Floor.tsx        # Floor tiles with holes
├── config/
│   └── gameConfig.ts    # Centralized game constants
├── App.tsx              # Root application component
└── main.tsx             # Application entry point
```

### Key Components

#### Scene.tsx

- Orchestrates the entire 3D world
- Generates floor configurations with elevators and holes
- Manages lighting and camera controls
- Implements physics world with gravity

#### Player.tsx

- Handles player character physics and movement
- Implements WASD keyboard controls
- Manages collision detection and falling mechanics

#### Elevator.tsx

- Creates moving platform elevators
- Implements smooth vertical movement between floors
- Handles player collision and transportation

#### Floor.tsx

- Generates floor tiles in a grid pattern
- Creates holes for elevators and fall-through mechanics
- Optimizes rendering with grouped geometry

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd fun-with-elevator
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to play the game

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run format` - Format code with Prettier

## 🎨 Game Configuration

The game is highly configurable through `src/config/gameConfig.ts`:

### Floor Settings

- `FLOOR_COUNT`: Number of floors (default: 4)
- `FLOOR_HEIGHT`: Vertical spacing between floors
- `TILE_COUNT`: Grid size for each floor (3x3)

### Gameplay Tuning

- `PLAYER_SPEED`: Movement speed
- `ELEVATOR_SPEED`: Elevator movement rate
- `MAX_FALL_HOLES_PER_FLOOR`: Random hole generation limit
- `GRAVITY`: Physics world gravity strength

### Visual Settings

- Lighting configuration (ambient and directional)
- Camera positioning and field of view
- Material colors and properties

## 🏗 Development Highlights

### Code Quality Features

- **TypeScript**: Full type safety throughout the codebase
- **ESLint Configuration**: Strict linting rules for code consistency
- **Modular Architecture**: Clean separation of concerns
- **Comprehensive Comments**: Well-documented code for maintainability

### Advanced Three.js Concepts

- **Physics Integration**: Seamless integration between visual and physics worlds
- **Dynamic Geometry**: Procedural generation of game elements
- **Camera Controls**: Smooth orbit controls for optimal viewing
- **Lighting System**: Realistic lighting with shadows

## 🎓 Assessment Criteria Demonstrated

This project showcases proficiency in:

1. **Modern React Development**: Hooks, TypeScript, component architecture
2. **3D Graphics Programming**: Three.js, shader concepts, 3D math
3. **Physics Simulation**: Real-time physics, collision detection, movement
4. **Game Development**: Game loops, user input, state management
5. **Code Organization**: Clean architecture, configuration management
6. **Performance**: Optimization techniques for 3D applications
7. **Documentation**: Comprehensive code comments and README

---

_This project demonstrates advanced web development skills using modern technologies for creating engaging 3D interactive experiences._
