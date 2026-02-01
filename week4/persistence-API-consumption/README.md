# Task Manager App - Module 3 Integration

This is a comprehensive web application designed for managing tasks. The project demonstrates core JavaScript proficiency, including DOM manipulation, data persistence with Local Storage, and server communication using the Fetch API.

## Technologies Used

* **Vite**: Fast development environment.
* **JavaScript (ES6+)**: Logic, modularity, and asynchronous operations.
* **HTML5 & CSS3**: Semantic structure and minimalist styling.
* **JSON Server**: Local REST API to simulate real-world backend interactions.

## Installation & Setup

1. **Clone the repository**
Copy the GitHub link and paste it into your terminal:

```bash
git clone [https://github.com/Juanjosegiraldo/Module3_Week_1_2_3_4_Riwi.git](https://github.com/Juanjosegiraldo/Module3_Week_1_2_3_4_Riwi.git)
```

Note: The repository has four folders. Make sure you are in the user_story/week4 folder.

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the Data Server:**
    Ensure you have a `db.json` file in your root folder with the following structure:
    ```json
    {
      "tasks": []
    }
    ```

4.  **Run the API Server (Port 3000):**
    ```bash
    npm run server
    ```

5.  **Run the Frontend App (Vite):**
    In a separate terminal, execute:
    ```bash
    npm run dev
    ```

## Features & Tasks

-   **Form Interaction (Tasks 1 & 2)**: Data capture via forms with validation to prevent empty entries.
-   **Dynamic DOM (Task 3)**: Elements are created and removed dynamically using `appendChild` and `removeChild` logic.
-   **Persistence (Task 4)**: Uses **Local Storage** to ensure data remains available after page reloads.
-   **Fetch API Integration (Task 5)**: Complete CRUD simulation:
    -   `GET`: Fetch and sync existing tasks from the server.
    -   `POST`: Add new tasks to the database.
    -   `DELETE`: Remove tasks from both the server and the UI.
-   **Error Handling (Task 6)**: Implements `try...catch` blocks and provides descriptive console logs for debugging.

## Project Structure

* `index.html`: Main application structure.
* `app.js`: Core logic and API communication.
* `styles.css`: Basic layout and styling.
* `db.json`: Local database for JSON Server.