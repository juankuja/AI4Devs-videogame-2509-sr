# Download Instructions for Tetris Sound Effects

If you want to use actual audio files instead of generated sounds, you can download free Tetris-style sound effects from these websites:

## Recommended Free Sound Effect Websites

### 1. **Pixabay** (Recommended - Free & No Attribution Required)
- **URL**: https://pixabay.com/sound-effects/search/tetris/
- **License**: Free for commercial use, no attribution required
- Search for: "tetris", "arcade", "game", "beep", "click"

### 2. **Freesound.org** (Free with Account)
- **URL**: https://freesound.org/
- **License**: Various licenses (check each file)
- Search for: "tetris", "game", "arcade", "8bit"
- **Note**: Requires free account registration

### 3. **SoundDino** (Free Tetris Sounds)
- **URL**: https://sounddino.com/en/effects/tetris/
- **License**: Free for personal/commercial use
- Has specific Tetris sound effects

### 4. **Orange Free Sounds**
- **URL**: https://orangefreesounds.com/tetris-block-move-sound-effect/
- **License**: Free with attribution
- Has Tetris-specific sounds

### 5. **Zapsplat** (Free with Account)
- **URL**: https://www.zapsplat.com/
- **License**: Free with account (attribution may be required)
- Search for: "game", "arcade", "beep", "click"

## Required Files

Download and place these files in the `assets/audio/` directory:

1. **rotate.mp3** - Short click/beep sound for piece rotation
   - Suggested search: "click", "beep", "ui click", "button click"
   - Duration: 50-100ms
   - Frequency: 600-1000 Hz

2. **line-clear.mp3** - Sound for clearing 1-3 lines
   - Suggested search: "success", "ding", "chime", "achievement"
   - Duration: 100-200ms
   - Ascending tone preferred

3. **tetris.mp3** - Celebratory sound for clearing 4 lines
   - Suggested search: "victory", "fanfare", "success", "achievement"
   - Duration: 300-500ms
   - More complex/musical sound

4. **game-over.mp3** - Sound for game over
   - Suggested search: "game over", "fail", "error", "buzzer"
   - Duration: 500-1000ms
   - Descending/sad tone preferred

## File Requirements

- **Format**: MP3 (recommended for browser compatibility)
- **Size**: < 100KB each (for fast loading)
- **Sample Rate**: 44.1kHz or 22kHz
- **Bitrate**: 128kbps or lower

## Quick Download Guide

1. Visit one of the websites above
2. Search for the sound type you need
3. Preview the sound
4. Download the MP3 file
5. Rename it to match the required filename
6. Place it in `assets/audio/` directory

## Example Search Terms

- **rotate.mp3**: "click", "beep", "ui sound", "button press", "tick"
- **line-clear.mp3**: "ding", "chime", "success", "point", "coin"
- **tetris.mp3**: "fanfare", "victory", "achievement", "level up", "success"
- **game-over.mp3**: "game over", "fail", "buzzer", "error", "lose"

## Current Status

The game currently uses **generated sounds** via Web Audio API as a fallback. These are simple beep/click sounds that work immediately without any downloads.

If you add the MP3 files above, the game will automatically use them instead of the generated sounds.

## Testing

After adding audio files:
1. Refresh the browser
2. Play the game
3. Check browser console for any loading errors
4. Verify sounds play correctly for each action

