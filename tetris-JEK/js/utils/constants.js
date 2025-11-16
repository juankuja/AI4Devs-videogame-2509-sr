// Game Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const LINES_PER_LEVEL = 10;

// Piece Colors (Hex values)
const PIECE_COLORS = {
    'I': 0x00f0f0,  // Cyan
    'O': 0xf0f000,  // Yellow
    'T': 0xa000f0,  // Purple
    'S': 0x00f000,  // Green
    'Z': 0xf00000,  // Red
    'J': 0x0000f0,  // Blue
    'L': 0xf0a000   // Orange
};

// Piece Shapes - All 7 pieces with 4 rotations each
const PIECE_SHAPES = {
    'I': [
        [[0,0,0,0],
         [1,1,1,1],
         [0,0,0,0],
         [0,0,0,0]],
        [[0,0,1,0],
         [0,0,1,0],
         [0,0,1,0],
         [0,0,1,0]],
        [[0,0,0,0],
         [0,0,0,0],
         [1,1,1,1],
         [0,0,0,0]],
        [[0,1,0,0],
         [0,1,0,0],
         [0,1,0,0],
         [0,1,0,0]]
    ],
    'O': [
        [[1,1],
         [1,1]]
        // O-piece doesn't rotate, all rotations are the same
    ],
    'T': [
        [[0,1,0],
         [1,1,1],
         [0,0,0]],
        [[0,1,0],
         [0,1,1],
         [0,1,0]],
        [[0,0,0],
         [1,1,1],
         [0,1,0]],
        [[0,1,0],
         [1,1,0],
         [0,1,0]]
    ],
    'S': [
        [[0,1,1],
         [1,1,0],
         [0,0,0]],
        [[0,1,0],
         [0,1,1],
         [0,0,1]],
        [[0,0,0],
         [0,1,1],
         [1,1,0]],
        [[1,0,0],
         [1,1,0],
         [0,1,0]]
    ],
    'Z': [
        [[1,1,0],
         [0,1,1],
         [0,0,0]],
        [[0,0,1],
         [0,1,1],
         [0,1,0]],
        [[0,0,0],
         [1,1,0],
         [0,1,1]],
        [[0,1,0],
         [1,1,0],
         [1,0,0]]
    ],
    'J': [
        [[1,0,0],
         [1,1,1],
         [0,0,0]],
        [[0,1,1],
         [0,1,0],
         [0,1,0]],
        [[0,0,0],
         [1,1,1],
         [0,0,1]],
        [[0,1,0],
         [0,1,0],
         [1,1,0]]
    ],
    'L': [
        [[0,0,1],
         [1,1,1],
         [0,0,0]],
        [[0,1,0],
         [0,1,0],
         [0,1,1]],
        [[0,0,0],
         [1,1,1],
         [1,0,0]],
        [[1,1,0],
         [0,1,0],
         [0,1,0]]
    ]
};

// Score Values
const SCORE_VALUES = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,    // per cell
    HARD_DROP: 2     // per cell
};

// Input Key Mappings
const INPUT_KEYS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    UP: 'UP',
    ROTATE_CW: 'SPACE',
    ROTATE_CCW: 'Z',
    PAUSE: 'P',
    ESCAPE: 'ESC'
};

// Scene Keys
const SCENE_KEYS = {
    MAIN_MENU: 'MainMenuScene',
    GAME: 'GameScene',
    PAUSE: 'PauseScene',
    GAME_OVER: 'GameOverScene',
    HIGH_SCORES: 'HighScoresScene'
};

