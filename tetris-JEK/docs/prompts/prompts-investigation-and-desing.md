# Prompts for Investigation and Design

**Project:** Tetris Clone Browser Game  
**Date:** 2024  
**Location:** `tetris-JEK/docs/prompts/`

---

This document captures all interactions between the user and the AI agent during the investigation and design phases of the Tetris clone browser game project.

---

## Investigation

### Request 1: Framework Selection Inquiry

**User Request:**
```
I want to build a lightweight tetris clone browser game compatible with the most used browsers nowadays. Which framework should I use?
```

**Agent Response:**
The agent analyzed the project structure, reviewed the existing Snake game example (which uses vanilla JavaScript), and provided recommendations:

- **Vanilla JavaScript with Canvas API** (recommended) - Zero dependencies, smallest bundle, full control
- **Phaser.js** - Lightweight game framework (~200KB), built for 2D games
- **Kaboom.js** - Very lightweight (~20KB), simple API
- **React/Vue/Svelte** - Component-based approach (larger bundle, overkill for simple Tetris)

The agent recommended vanilla JavaScript with Canvas API for maximum compatibility and minimal overhead, noting it aligns with the project's existing approach.

**Outcome:** User gained understanding of framework options and their trade-offs.

---

### Request 2: Game Design Roles Inquiry

**User Request:**
```
ok, for the game design process which are the main roles that I should consider?
```

**Agent Response:**
The agent provided a comprehensive breakdown of game design roles:

**Core Roles:**
1. **Game Designer** - Core mechanics, difficulty curve, game rules
2. **Programmer/Developer** - Game logic, input handling, state management
3. **UI/UX Designer** - Visual layout, user interface, accessibility
4. **Visual Artist** - Piece colors, backgrounds, themes (optional for Tetris)
5. **Audio Designer** - Sound effects, background music (optional)
6. **QA/Playtester** - Testing, bug finding, browser compatibility

**For Tetris Project:**
- Minimum: Game Designer + Programmer, UI Designer
- Nice to have: Visual Artist, Audio Designer

The agent also provided a design process checklist covering core mechanics, gameplay design, UI/UX design, visual design, and technical design.

**Outcome:** User understood the roles and responsibilities needed for game development.

---

## Design

### Request 3: Product Requirements Document Creation

**User Request:**
```
Help me to define a clear and well structured PRD document for a lightweight tetris clone browser game. Output the document in markdown format to the file tetris-prd.md under tetris-JEK/docs. The game must have at least the following features:

  - It consists of the classical pieces.
  - the gridbox should fill the browser's page full height.
  - Next piece indicator panel, plus current level, current score and lines stats indicators.
  - The speed increases with each new level.
  - Screens:
   - Main screen: with the game title, and with New game and high scores options selectables by keyboard
   - Game Screen: the gameplay screen with the gridbox and mentioned indicators
   - Game over Screen: it has an input box for the user to enter its three initials in order to store the score.
   - Pause screen: when the user pauses the game. It must have an option to resume and another to go back to the main screen
   - High Scores Screen: with the top 10 game scores, showing rank, initials, score and date time
  - UI aspects:
    - Attractive, with clear fonts and colors.
  - Different sounds for:
    - Piece rotation.
    - Line cleared.
    - Tetris line cleared.
    - Game over.
  - It must be fully compatible with the current most used browsers
```

**Agent Response:**
The agent created a comprehensive PRD document (`tetris-prd.md`) with the following structure:

1. **Overview** - Product description, objectives, target audience
2. **Core Game Features** - All 7 classical pieces, game board specifications, mechanics
3. **User Interface Components** - Indicators, design requirements
4. **Game Screens** - Detailed specifications for all 5 screens
5. **Audio Requirements** - All 4 sound effects
6. **Technical Requirements** - Browser compatibility, technology stack
7. **Scoring System** - Point calculation, level progression
8. **User Experience Flow** - Navigation flows
9. **Success Criteria** - Functional, quality, UX requirements
10. **Testing Requirements** - Browser, gameplay, UI/UX, audio testing
11. **Project Structure** - File organization
12. **Acceptance Criteria** - Definition of done

The document covered all requested features and provided a complete specification for the game.

**Outcome:** Comprehensive PRD document created, serving as the foundation for all subsequent design work.

---

### Request 4: Framework Specification Update

**User Request:**
```
change the prd document to indicate that phase framework will be used
```

**Agent Response:**
The agent updated the PRD document to specify Phaser framework throughout:

- Updated Product Description (Section 1.1) to mention Phaser
- Updated Technology Stack (Section 6.2) with Phaser as primary framework
- Added new Section 6.2.1 with Phaser implementation details
- Updated Code Quality section to reference Phaser best practices
- Updated Audio Implementation to use Phaser's audio system
- Updated Browser Compatibility to note Phaser handles differences
- Updated Project Structure to reflect Phaser scene-based architecture

**Outcome:** PRD now clearly specifies Phaser 3.x as the chosen framework with detailed implementation guidance.

---

### Request 5: Technical Design Document Creation

**User Request:**
```
Act as an experienced Game Design Architect and considering @tetris-prd.md define a new technical documentation artifact under tetris-JEK/docs folder called tetris-tdd.md
```

**Agent Response:**
The agent created a comprehensive Technical Design Document (`tetris-tdd.md`) covering:

1. **System Architecture** - High-level architecture diagram and principles
2. **Phaser Framework Configuration** - Game config, scene management
3. **Component Design** - Detailed specs for all scenes and game logic components
4. **Rendering System** - Board rendering, piece rendering, UI rendering
5. **Input Handling** - Keyboard mapping, Phaser input system integration
6. **Audio System** - Audio file structure, loading, playback
7. **Game Loop and Timing** - Phaser update loop, delta time handling
8. **Data Flow and State Management** - Scene data passing, state machine
9. **Performance Optimization** - Rendering, memory, calculation optimizations
10. **Error Handling** - Error scenarios, edge cases
11. **Testing Strategy** - Unit, integration, system testing
12. **File Structure** - Directory organization, module dependencies
13. **Implementation Phases** - 6-phase breakdown
14. **Technical Constraints** - Browser limitations, Phaser constraints
15. **Future Enhancements** - Potential improvements
16. **Glossary** - Technical terms

The document included code examples, algorithms, data structures, and Phaser-specific implementation patterns.

**Outcome:** Complete technical blueprint created, translating PRD requirements into actionable technical specifications.

---

### Request 6: Implementation Plan Creation

**User Request:**
```
Now considering the prd and tdd files, define a new artifact under tetris-JEK/docs called tetris-implementation-plan.md with a clear and well structured implementation plan for building the game.

@tetris-prd.md  @tetris-tdd.md
```

**Agent Response:**
The agent created a detailed Implementation Plan (`tetris-implementation-plan.md`) with:

**8 Implementation Phases:**
1. **Phase 1:** Foundation and Core Setup (project structure, Phaser config, main menu)
2. **Phase 2:** Core Game Logic Components (Tetromino, TetrisBoard, collision detection)
3. **Phase 3:** Game Manager and Core Gameplay (movement, rotation, scoring)
4. **Phase 4:** Rendering System (board, pieces, UI elements)
5. **Phase 5:** Input Handling (keyboard controls, menu navigation)
6. **Phase 6:** Additional Screens (Pause, Game Over, High Scores)
7. **Phase 7:** Audio System Integration (all sound effects)
8. **Phase 8:** Polish and Optimization (performance, browser compatibility)

**Each Phase Included:**
- Objective
- Detailed tasks with file paths
- Acceptance criteria
- Testing checklist
- Deliverables

**Additional Sections:**
- Risk Management
- Testing Strategy
- Milestones and Deliverables
- Success Criteria
- Post-Implementation considerations

**Outcome:** Actionable implementation roadmap created with 57 specific tasks, ready for development execution.

---

### Request 7: Role Assignments Enhancement

**User Request:**
```
enrich the plan indicating for each task the more suitable role that should implement it, for example: frontend developer, ux/ui designer, game logic engineer, etc
```

**Agent Response:**
The agent enriched the implementation plan by:

1. **Adding Section 1.4: Team Roles** - Defined 6 roles:
   - Frontend Developer
   - Game Logic Engineer
   - UX/UI Designer
   - Audio Engineer
   - QA Engineer
   - DevOps/Technical Lead

2. **Adding Role Assignments** - Each of the 57 tasks now includes a **Role** field:
   - **Phase 1:** DevOps/Technical Lead, Frontend Developer, UX/UI Designer, Game Logic Engineer
   - **Phase 2:** Game Logic Engineer (all tasks)
   - **Phase 3:** Game Logic Engineer (all tasks)
   - **Phase 4:** Frontend Developer + UX/UI Designer (all rendering tasks)
   - **Phase 5:** Frontend Developer + UX/UI Designer (input handling)
   - **Phase 6:** Frontend Developer, UX/UI Designer, Game Logic Engineer
   - **Phase 7:** Audio Engineer + Frontend Developer
   - **Phase 8:** Multiple roles (polish, testing, documentation)

**Outcome:** Implementation plan now clearly identifies responsible roles for each task, enabling better team coordination and task assignment.

---

## Summary

**Investigation Phase:**
- Explored framework options and made recommendations
- Identified and explained game design roles and responsibilities

**Design Phase:**
- Created comprehensive Product Requirements Document (PRD)
- Updated PRD to specify Phaser framework
- Created detailed Technical Design Document (TDD)
- Created actionable Implementation Plan with 8 phases and 57 tasks
- Enhanced Implementation Plan with role assignments

**Total Artifacts Created:**
1. `tetris-prd.md` - Product Requirements Document
2. `tetris-tdd.md` - Technical Design Document
3. `tetris-implementation-plan.md` - Implementation Plan with role assignments

All documents are aligned and ready to guide the development of the Tetris clone browser game.

---

**Document Status:** Complete  
**Total Interactions:** 7  
**Investigation Requests:** 2  
**Design Requests:** 5

