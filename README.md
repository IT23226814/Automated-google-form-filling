# Automated Google Form Filling

An AI-powered solution for automatically filling Google Forms based on natural language requirements.

## Features

* AI-powered form interpretation using Google's Gemini model
* Automated form filling using Selenium WebDriver
* React-based user interface
* Screenshot capture of form filling process
* Event logging for debugging and monitoring

## Project Structure

```
├── backend/              # Python backend service
│   ├── main.py          # FastAPI server
│   ├── process.py       # Form processing logic
│   ├── utils.py         # Helper utilities
│   ├── get_html.py      # HTML extraction
│   └── requirements.txt  # Python dependencies
├── interface/           # React frontend
    ├── src/            # Source files
    └── public/         # Static assets
```

## Prerequisites

* Python 3.11+
* Node.js 16+
* Google Chrome browser
* ChromeDriver

## Installation

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd interface
   npm install
   ```

## Usage

1. Start the backend server:
   ```bash
   cd backend
   python main.py
   ```

2. Start the frontend development server:
   ```bash
   cd interface
   npm start
   ```

3. Open http://localhost:3000 in your browser

4. Enter:
   * Google Form URL
   * Requirements/information for filling the form
   * Click Submit

The application will:
1. Extract form structure using Selenium
2. Process requirements with Gemini AI
3. Fill form fields automatically
4. Take screenshots of the process
5. Submit the form

## Technology Stack

### Backend:
* FastAPI
* Selenium WebDriver
* Google Gemini AI
* Python

### Frontend:
* React