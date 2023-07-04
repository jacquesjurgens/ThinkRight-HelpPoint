Shared Dependencies:

1. **Exported Variables**: 
   - `activeTabId`: Shared between `background.js` and `content.js` to keep track of the currently active tab.
   - `userActions`: Shared between `content.js` and `popup.js` to store the user actions.
   - `instructions`: Shared between `content.js` and `popup.js` to store the instructions entered by the user.

2. **Data Schemas**: 
   - `InstructionSchema`: Shared between `content.js` and `popup.js` to structure the instructions data.

3. **DOM Element IDs**: 
   - `startButton`: Used in `popup.html` and `popup.js` to start capturing user actions.
   - `stopButton`: Used in `popup.html` and `popup.js` to stop capturing user actions.
   - `instructionInput`: Used in `popup.html` and `popup.js` for user to enter instructions.
   - `highlightCheckbox`: Used in `popup.html` and `popup.js` for user to specify if it's a highlight.

4. **Message Names**: 
   - `startCapture`: Shared between `background.js`, `content.js`, and `popup.js` to start capturing user actions.
   - `stopCapture`: Shared between `background.js`, `content.js`, and `popup.js` to stop capturing user actions.
   - `storeInstruction`: Shared between `content.js` and `popup.js` to store user instructions.

5. **Function Names**: 
   - `highlightElement`: Defined in `content.js` and used in `popup.js` to highlight HTML elements.
   - `generateSelector`: Defined in `content.js` and used in `popup.js` to generate unique jQuery selector.
   - `generateIntroJSJSON`: Defined in `content.js` and used in `popup.js` to generate IntroJS-compatible JSON file.
   - `downloadFile`: Defined in `content.js` and used in `popup.js` to download the generated JSON file.