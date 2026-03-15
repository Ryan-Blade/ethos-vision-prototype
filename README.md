# Ethos-Vision: Autonomous Supply Chain Oracle - Hackathon Prototype

Ethos-Vision is a rapid prototype built to simulate an AI-powered ethical audit system for products. By simply uploading an image of a product, barcode, or receipt, the system leverages advanced vision AI to identify the brand and generate a simulated "Ethos Score" reflecting potential labor practices, environmental impact, and overall corporate responsibility.

This project was built designed specifically for a 1-2 hour hackathon sprint, emphasizing rapid development, functional API integration, and a clean, responsive user interface.

## ✨ Features

- **Image Upload:** Accept product images, barcodes, or receipts via a simple web interface.
- **AI Analysis:** Seamlessly integrates with the OpenAI GPT-4o Vision API to analyze image content.
- **Simulated Ethical Audit:** Generates a synthetic "Ethos Score" (0-100) and a brief summary of the brand's ethical footprint.
- **Responsive UI:** A clean, modern frontend built with React and Vite for rapid feedback and display.

## 🛠 Technologies Used

- **Frontend:** React, Vite, JavaScript, CSS.
- **Backend:** Python 3.9+, Flask, Flask-CORS.
- **AI Integration:** OpenAI GPT-4o Vision API.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18+ recommended) and `npm` (or `yarn`).
- **Python** (v3.9+) and `pip`.
- **Git**
- **OpenAI API Key** (You must have an active OpenAI account and a valid API key).

## 🚀 Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:
```bash
git clone <your-repository-url>
cd ethos-vision-prototype
```

### 2. Backend Setup (Flask API)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment:**
   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables:**
   You must provide your OpenAI API key for the vision analysis to work.
   - Create a file named `.env` in the `backend` directory.
   - Add your key to the file:
     ```env
     OPENAI_API_KEY="sk-your-openai-api-key-here"
     ```
   - *Alternatively*, set it via your terminal:
     - **Windows (PowerShell):** `$env:OPENAI_API_KEY="sk-your-key-here"`
     - **Windows (CMD):** `set OPENAI_API_KEY="sk-your-key-here"`
     - **macOS / Linux:** `export OPENAI_API_KEY="sk-your-key-here"`

### 3. Frontend Setup (React App)

1. **Open a new terminal window** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

## 🏃 Running the Application

You will need to run the backend and frontend servers simultaneously in two separate terminal windows.

### Start the Backend Server (Terminal 1)
Ensure your virtual environment is activated in the `backend` directory.
```bash
python app.py
```
*The backend API will start running on `http://localhost:5000`.*

### Start the Frontend Server (Terminal 2)
Ensure you are in the `frontend` directory.
```bash
npm run dev
```
*The React application will be served, typically at `http://localhost:5173`. Check the terminal output for the exact URL.*

## 💡 Usage

1. Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2. Click **"Choose an Image..."** and select an image of a product, label, or barcode (JPEG or PNG).
3. A preview of the image will appear.
4. Click the **"Analyze Image"** button.
5. Wait for the AI to process the image (a loading state will display).
6. View the results, including the detected Product Name, Brand Name, Ethos Score, and the simulated Ethical Summary!

## ⚠️ Hackathon Considerations

- **Simulated Audit:** This is a rapid prototype. The "Ethical Audit" provided by the AI is a *simulation* based on the LLM's pre-existing training data and the context of the prompt. It does **not** perform real-time web scraping, supply chain verification, or access live databases.
- **Production Readiness:** This application uses Flask's built-in development server and lacks production-grade security measures. It is intended strictly for demonstration purposes.

## 🔮 Future Enhancements

If this project were to be developed beyond a hackathon sprint, potential next steps could include:

- **Real-time Data Integration:** Replacing the simulated LLM audit with actual data pulled from APIs covering labor violations, environmental records, or corporate sustainability reports.
- **Persistent Storage:** Implementing a database (e.g., PostgreSQL, MongoDB) to store user scan history, product analytics, and community-driven corrections.
- **Multi-Agent System:** Utilizing separate, specialized AI agents for different parts of the audit constraint (e.g., one agent for environmental impact, one for labor rights, an aggregator agent to compile the final score).
- **Mobile Application:** Building a React Native version for on-the-go scanning in retail environments!
