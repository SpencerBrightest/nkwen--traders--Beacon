# Nkwen Traders - Development Rules and Guidelines

These rules dictate the implementation standards for this pixel-perfect UI project.

## 1. Existing Structure
- Always read existing `index.html` and `index.css`/`style.css` before writing any JS to understand structure, class names, and styling.
- Do not invent new markup or restructure HTML unless absolutely necessary.

## 2. JavaScript Standards (`index.js`)
- Target actual elements/classes/IDs already in the HTML.
- Use clean, modern Vanilla JS. Do not add libraries by default (justify if a small library is genuinely needed).
- Include clear comments explaining each function's purpose.
- Handle edge cases gracefully (empty states, invalid input, missing elements).
- Organize code into named functions, avoiding one giant script block.

## 3. Images and Assets
- Do not generate or source external stock images.
- Use only the existing images found in the local `/assets` folder.
- Ensure all images accurately reflect the reference design.
- Update HTML/CSS paths to point to `/assets` accordingly.

## 4. Responsiveness and Layout
- The design MUST be responsive.
- Implement a sidebar for the mobile hamburger menu (NOT a topbar).

## 5. Visual QA and Mismatch Fixing
- Compare rendered result against the reference design image.
- Flag any visual mismatches (spacing, color, alignment, font weight) before finalizing.
- Fix mismatches one section at a time rather than regenerating everything at once.

## 6. Delivery
- Provide the complete, final content of every file touched (no partial snippets) for full context review.

## 7. Interactivity Clarification
- Ask for clarification before assuming what interactivity the JS should handle if not obvious from the HTML structure (e.g., nav toggle, form validation, modals, carousel).
