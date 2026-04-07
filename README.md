# Tic Tac Toe Bot

A lightweight, browser-based Tic Tac Toe game built using pure HTML, CSS, and JavaScript.
It features an AI opponent powered by the Minimax algorithm, offering both easy and hard difficulty modes, along with match tracking and a clean responsive UI.

Tic Tac Toe Bot is designed for learning, experimentation, and gameplay. It follows a modular development structure with a single-file distributable build for portability and a structured source setup for maintainability.

---

⚠️ Disclaimer
This project is intended for educational and experimental purposes only. It is not a competitive AI system. Some behaviors may vary across browsers, and edge cases or AI quirks may exist.

---

## Usage

### Option 1 — Quick Use (Recommended)

1. Download `dist/tic-tac-toe-bot.html`
2. Open it in any browser
3. Start playing immediately

* Works offline
* No installation required

---

### Option 2 — Development Mode

1. Clone the repository
2. Open:

```
src/index.html
```

3. Edit files inside the `src/` directory
4. Build the project when needed:

```
python scripts/build.py
```

Recommended for development, customization, and learning.

---

## Features

* Classic 3×3 Tic Tac Toe gameplay
* Player vs AI (X = user, O = AI)
* Difficulty modes:

  * Easy: random moves
  * Hard: Minimax algorithm
* Match progress tracking with progress indicators
* Detects wins, draws, and ongoing states
* Highlights winning combinations
* Reset round or full match
* Toggle difficulty dynamically
* Sound effects for interactions
* Fully offline and self-contained

---

## Project Structure

```
tic-tac-toe-bot/
│
├── index.html              # Entry / landing page
│
├── src/                    # Development source code
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── dist/                   # Final build (for users)
│   └── tic-tac-toe-bot.html  # Single-file app
│
├── scripts/                # Build tools
│   └── build.py
│
├── README.md
├── LICENSE
└── .gitignore
```

---

### Build System

Run:

```
python scripts/build.py
```

This will:

* Combine HTML, CSS, and JavaScript
* Bundle everything into a single file
* Output the final build into the `dist/` directory

---

## Architecture Overview

This project uses two modes:

### Development Mode

* Modular structure inside `src/`
* Easier debugging and editing
* Ideal for learning and extending logic (UI + AI)

### Production Mode

* Single-file build inside `dist/`
* Fully portable
* Offline-ready with no dependencies

---

## Technology Stack

* HTML5
* CSS3
* Vanilla JavaScript (DOM manipulation + Minimax AI)
* Python (build automation only)

---

## Limitations

* Not a perfect AI (Minimax is deterministic but still basic in this context)
* No multiplayer or online mode
* No persistent storage of match history
* Browser-dependent rendering differences may exist
* UI is intentionally minimal for clarity and learning

---

## Live Demo

Try it here:
https://akpandey-dev.github.io/tic-tac-toe-bot

---

## Contributing

* Open for learning and experimentation
* Bugs may exist
* Improvements and suggestions are welcome

---

## License

This project is open for learning, modification, and experimentation.
