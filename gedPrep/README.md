# GED RLA Question Generation

## Overview

This project processes a PDF containing GED RLA multiple-choice questions and generates new GED-style questions in a structured JSON format, suitable for frontend integration. The system uses OpenAI's GPT models and focuses on rigorous formatting and diverse question types.

## Features

- **PDF Processing:** Extracts text from GED RLA PDF documents.
- **AI-Powered Generation:** Utilizes OpenAI's GPT models for question creation.
- **Custom Parsing:** Outputs JSON-formatted questions for easy integration.
- **Scalable Design:** Focused on GED RLA but adaptable to other domains.

## Approaches

1. **Initial Attempts:**
   - Used Hugging Face models but faced input size limitations and complexity.
2. **Passage-Based Questions:**
   - Generated questions from single passages but required manual passage collection.
3. **Free Generation:**
   - Prompted for random questions but suffered from topic repetition.
4. **Current Approach:**
   - Reads GED RLA guides, extracts question patterns, and generates diverse questions with balanced formats.

## Challenges

- **Consistency:** Ensuring JSON output is rigorous and reliable.
- **Repetition Avoidance:** Managing diverse topics and question types without manual intervention.
- **Prompt Engineering:** Fine-tuning prompts for clear instructions and consistent outputs.

## How to Run

1. **Install Dependencies: Make sure Python 3.x is installed. Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Set OpenAI API Key:**

   - Copy .env.example to .env

   ```bash
   cp .env.example .env
   ```

   - Add your OpenAI API key to the .env file:

   ```bash
   OPENAI_API_KEY=your-api-key
   ```

3. **Run The Main Script**

   - Place your GED RLA PDF file in the materials/ folder.

   ```bash
   python mcq_from_sample.py
   ```

4. **View The Output**
   - Generated questions will be saved in the output/ folder as:
     questions_string.txt (raw questions)
     parsed_questions.json (structured JSON)

## Folder Structure

project/
├── materials/ # Input PDFs and related content
├── old_approaches/ # Previous methodologies
├── output/ # Generated questions and JSON outputs
├── mcq_from_sample.py # Main script for question generation
├── parse.py # Parsing script for structured JSON
└── .env.example # Environment variable example file

## Dependencies

- Python 3.x
- Required packages: openai, python-dotenv, pdfplumber
  Install dependencies with:
  `bash
pip install -r requirements.txt
`

## Future Enhancements

- Automate topic and type tracking for balanced question generation.
- Extend functionality to other exam formats and subjects.
- Randomize topic selection while avoiding repetitions.
