from mcq import generate_mcq
from user_data import get_user_score, update_user_score, get_user_topic, update_user_topic
from display import show_question
from validation import validate_answer

def generate_question(subject, topic, question_type="MCQ"):
    if question_type == "MCQ":
        return generate_mcq(subject, topic)

def update_score(result, current_score):
    if result:
        return current_score + 2
    else:
        return max(0, current_score - 1)  # Prevent negative score

def move_to_next_topic(score, current_topic, user_id):
    if score > 5:
        new_topic = get_next_topic(current_topic)
        update_user_topic(user_id, new_topic)
        return new_topic
    return current_topic

def main():
    user_id = input("Enter your user ID: ")
    
    # Initialize user score and topic from database or default values
    score = get_user_score(user_id) or 0
    topic = get_user_topic(user_id) or "Introduction"

    while True:
        # Generate and show the question
        curr_question = generate_question("Math", topic)
        show_question(curr_question)

        # Get user answer and validate
        user_answer = input("Your answer: ")
        result = validate_answer(curr_question, user_answer)
        
        # Update the score and move to the next topic if necessary
        score = update_score(result, score)
        update_user_score(user_id, score)
        topic = move_to_next_topic(score, topic, user_id)
        
        # Check if the user has completed all topics
        if topic is None:
            print("Congratulations! You've completed all topics.")
            break

if __name__ == "__main__":
    main()
