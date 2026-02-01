/*
Selection of DOM elements using two different methods.
We use getElementById for direct access and querySelector for CSS-like flexibility.
*/
const noteInput = document.getElementById("noteInput");
const addBtn = document.querySelector("#addBtn");
const notesList = document.getElementById("notesList");

console.log("DOM Elements initialized:", { noteInput, addBtn, notesList });

/*
Persistence with Local Storage.
We initialize the array by parsing the stored JSON string. 
The '|| []' (logical OR) ensures we have an empty array if no data exists yet.
*/
let notes = JSON.parse(localStorage.getItem("notes")) || [];
console.log(`Initial load: ${notes.length} notes found in Local Storage.`);

/*
Creates and renders a note element in the DOM.
This logic is encapsulated in a function to reuse it both on page load and 
when the user adds a new note.
*/
function createNoteElement(text) {
    // Create element and modify content with textContent for security
    const li = document.createElement("li");
    li.textContent = text; 

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn"; // Matches the class in your CSS

    /*
    Delete logic.
    We remove the node from the DOM and update the storage simultaneously 
    to keep the UI and Data in sync.
    */
    deleteBtn.onclick = () => {
        notesList.removeChild(li); // Remove from visual DOM
        
        // Filter out the deleted note from the memory array
        notes = notes.filter(note => note !== text); 
        
        // Update Local Storage with the new array
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(`Action: Note "${text}" removed.`);
    };

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}

// Render previously saved notes on startup
notes.forEach(note => createNoteElement(note));

/*
Event handler to add notes.
Validates input, updates the data state (array), and reflects changes in the DOM.
*/
addBtn.onclick = () => {
    const value = noteInput.value.trim();
    
    // Basic validation to prevent empty entries
    if (value === "") return alert("Please type something.");

    // Update memory array and Local Storage
    notes.push(value);
    localStorage.setItem("notes", JSON.stringify(notes));
    
    // Update DOM by calling our creation function
    createNoteElement(value);
    
    // UX: Clear input and return focus for the next note
    noteInput.value = "";
    noteInput.focus();
    console.log("Action: New note saved successfully.");
};