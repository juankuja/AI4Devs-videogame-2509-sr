# Audio Assets

This directory should contain the following audio files for the Tetris game:

- `rotate.mp3` - Sound effect for piece rotation
- `line-clear.mp3` - Sound effect for clearing 1-3 lines
- `tetris.mp3` - Sound effect for clearing 4 lines (Tetris)
- `game-over.mp3` - Sound effect for game over

## Audio Requirements

- Format: MP3 (recommended for browser compatibility)
- Size: < 100KB each (recommended for fast loading)
- Quality: Acceptable quality for game sound effects

## Note

If audio files are not present, the game will continue to function without audio (graceful degradation). The AudioManager handles missing files gracefully.

## Finding Audio Files

You can find free Tetris-style sound effects from:
- FreeSound.org
- OpenGameArt.org
- Create your own using audio editing software

