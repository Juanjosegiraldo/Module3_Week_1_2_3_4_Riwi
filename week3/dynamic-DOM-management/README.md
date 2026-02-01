## Note Manager Pro — DOM & Local Storage
This is a lightweight Mini-App built to demonstrate advanced DOM manipulation, event handling, and data persistence using the Web Storage API.
### Features
#### Dynamic Rendering: Add and remove notes in real-time without reloading the page.
#### Persistent Data: Your notes are stored in Local Storage, so they remain even after a browser refresh.
#### Variable-Driven UI: Styled using CSS :root variables for easy theming.
#### Optimized UX: Automatic input clearing and focus management.

### Tech Stack
#HTML5: Semantic structure and structure.
#CSS3: Custom properties (--primary-color) and Flexbox layout.
#JavaScript: ES6+ logic, DOM API methods, and JSON handling.
#Vite: Development server and bundling.

### Task Checklist
[x] TASK 1: Base HTML structure with Input and List.
[x] TASK 2: Selection of elements using getElementById and querySelector.
[x] TASK 3: Note creation with validation and appendChild.
[x] TASK 4: Note deletion using removeChild.
[x] TASK 5: Persistence with JSON.parse and JSON.stringify.

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**
Copy the GitHub link and paste it into your terminal:

```bash
git clone [https://github.com/Juanjosegiraldo/Module3_Week_1_2_3_4_Riwi.git](https://github.com/Juanjosegiraldo/Module3_Week_1_2_3_4_Riwi.git)
```

Note: The repository has four folders. Make sure you are in the user_story/week3 folder.

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Launch Development Server:**
   ```bash
   npm run dev
   ````

4. **View Results:** Open your browser at http://localhost:5173 and press F12 (or Cmd+Option+I) to view the logic execution in the Console.

.
├── 📄 manipulacion_dom.html    # Entry point
├── 📁 public                   # Static Files
├── 📁 src
│   └── 📜 main.js              # Main logic (English version)
|   └── 📄 style.css            # Global styles and visual design (CSS)
├── 📄 gitignore                #Exclude files of Git (like node_modules).
├── 📦 package.json             # Dependencies & Scripts
└── 📘 README.md                # Documentation

### How it Works
#### 1. Data Persistence Workflow
The application follows a State-First approach:
User interaction updates the notes array.
The array is synchronized with localStorage via JSON.stringify().
On page load, data is retrieved and parsed back into the UI.

#### 2. DOM Manipulation
We use the DOM API to create elements on the fly:

```Javascript
const li = document.createElement("li");
li.textContent = text;
// ... append to parent
```

NOTE: When using Vite, it was not possible to change the name index.html to the one requested in the exercise: manipulacion_dom.html
