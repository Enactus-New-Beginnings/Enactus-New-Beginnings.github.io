import streamlit as st
import openai

# Initialize OpenAI API
openai.api_key = "your-openai-api-key"
st.title("Quiz Generator App")

# Step 1: Input the course name
course_name = st.text_input("Enter the Course Name", "e.g., Introduction to Machine Learning")

# Step 2: Quiz customization
num_questions = st.slider("Number of Questions", 1, 10, 5)
quiz_type = st.selectbox("Quiz Type", ["Multiple Choice", "Short Answer"])
difficulty = st.selectbox("Difficulty Level", ["Easy", "Medium", "Hard"])

# Step 3: Generate Quiz
if st.button("Generate Quiz"):
    # Construct the prompt based on the customization
    prompt = (
        f"Create a {num_questions}-question {quiz_type.lower()} quiz on {course_name}. "
        f"The quiz should cover key topics and concepts relevant to the course material "
        f"and be of {difficulty} difficulty."
    )

    # Call OpenAI API using the correct method
    response = openai.ChatCompletion.create(
        model="gpt-4",  # Or another model available to you
        messages=[{"role": "user", "content": prompt}]
    )

    # Access the generated text content
    quiz_content = response.choices[0].message['content'].strip()
    quiz_questions = quiz_content.split("\n")
    
    # Display generated quiz questions
    st.write("### Generated Quiz Questions")
    for question in quiz_questions:
        st.write(question)
