# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

This is a vanilla HTML/CSS/JavaScript game with no build step or dependencies. To run locally:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Architecture

**Drink Snobs** is a coffee/tea shop simulation game where players prepare drinks to customer specifications.

### Core Files
- `index.html` - Game UI structure with customer area, preparation station, and recipe book modal
- `script.js` - All game logic in a single file
- `style.css` - Styling

### Game Flow (script.js)
1. `nextCustomer()` generates a random order (70% available drinks, 30% unavailable)
2. Player either prepares drink with correct parameters or clicks "Sorry" button for unavailable drinks
3. `serveDrink()` calculates score via `calculateScore()` comparing player settings to recipe ideals
4. Reviews displayed based on score thresholds

### Key Data Structures
- `recipes` object: Defines drink parameters (ideal values, tolerances) for black-coffee, espresso, green-tea, black-tea
- `currentOrder`: Tracks what customer requested (drink type, strength, method for coffee)
- `currentSettings`: Player's preparation settings (temperature, steep time, pressure, etc.)
- `isUnavailableOrder`: Boolean flag for drinks not on menu (triggers suggestion flow)

### Drink Types and Controls
- **Tea** (green/black): Temperature + steep time
- **Coffee** (black): Temperature + strength (light/medium/strong) + method (pour-over/drip)
- **Espresso**: Temperature + pressure + extraction time + water amount + beans amount

### Game Mechanics
- Lying mechanic: Players can click "Sorry" even for available drinks (30% chance of being caught, results in furious 1-star review)
- Suggestion system: When drink unavailable, player suggests alternatives (70% acceptance rate)
- Rating system: Cumulative star rating displayed in header
