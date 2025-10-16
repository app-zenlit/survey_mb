import streamlit as st
import pandas as pd
from datetime import datetime
import json

# Page configuration
st.set_page_config(
    page_title="AI & Digitalization Survey",
    page_icon="📋",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main {
        background: linear-gradient(to bottom right, #f9fafb, #eff6ff, #f9fafb);
    }
    .stButton > button {
        width: 100%;
        background-color: #2563eb;
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.3s;
    }
    .stButton > button:hover {
        background-color: #1d4ed8;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .stButton > button:disabled {
        background-color: #d1d5db;
        color: #6b7280;
        cursor: not-allowed;
    }
    .question-container {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }
    .header-container {
        background: linear-gradient(to right, #2563eb, #1d4ed8);
        padding: 2rem;
        border-radius: 1rem 1rem 0 0;
        color: white;
        margin-bottom: 0;
    }
    .progress-bar {
        background-color: #e5e7eb;
        height: 8px;
        border-radius: 4px;
        margin: 1.5rem 0;
        overflow: hidden;
    }
    .progress-fill {
        background: linear-gradient(to right, #2563eb, #3b82f6);
        height: 100%;
        transition: width 0.3s ease;
    }
    h1 {
        margin: 0;
        font-size: 2rem;
    }
    .subtitle {
        color: #bfdbfe;
        margin-top: 0.5rem;
    }
    .question-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }
    .stRadio > label {
        font-weight: 500;
        color: #374151;
    }
    .stCheckbox > label {
        font-weight: 500;
        color: #374151;
    }
    .nav-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    .success-message {
        background: linear-gradient(to bottom right, #dcfce7, #bbf7d0);
        padding: 3rem;
        border-radius: 1rem;
        text-align: center;
        border: 2px solid #86efac;
    }
    .submit-container {
        background: linear-gradient(to bottom right, #dbeafe, #bfdbfe);
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        margin-bottom: 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = 0
if 'survey_data' not in st.session_state:
    st.session_state.survey_data = {
        'q1': None,
        'q2': None,
        'q3': None,
        'q4': None,
        'q5': None,
        'q6': [],
        'q7a': '',
        'q7b': 5,
        'q8': None,
        'q9': None,
        'q10': [],
        'q10_elaborate': '',
        'q11': '',
        'q12': None,
        'q13': [],
        'q14': None,
        'q15': None,
        'q16': [],
    }
if 'is_submitted' not in st.session_state:
    st.session_state.is_submitted = False

# Total pages (16 questions + 1 submit page)
TOTAL_PAGES = 17

# Navigation functions
def next_page():
    if st.session_state.current_page < TOTAL_PAGES - 1:
        st.session_state.current_page += 1

def prev_page():
    if st.session_state.current_page > 0:
        st.session_state.current_page -= 1

# Validation function
def is_page_valid():
    data = st.session_state.survey_data
    page = st.session_state.current_page

    validations = {
        0: data['q1'] is not None,
        1: data['q2'] is not None,
        2: data['q3'] is not None,
        3: data['q4'] is not None,
        4: data['q5'] is not None,
        5: len(data['q6']) > 0,
        6: data['q7a'].strip() != '',
        7: data['q8'] is not None,
        8: data['q9'] is not None,
        9: len(data['q10']) > 0,
        10: data['q11'].strip() != '',
        11: data['q12'] is not None,
        12: len(data['q13']) > 0,
        13: data['q14'] is not None,
        14: data['q15'] is not None,
        15: len(data['q16']) > 0,
        16: True
    }

    return validations.get(page, True)

# Header
st.markdown("""
<div class="header-container">
    <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 2rem;">📋</span>
        <div>
            <h1>AI & Digitalization Survey</h1>
            <p class="subtitle">Help us understand your experience with digital tools and AI technology</p>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Main container
main_container = st.container()

with main_container:
    # Progress bar (hide on submit page)
    if st.session_state.current_page < TOTAL_PAGES - 1:
        progress = (st.session_state.current_page / (TOTAL_PAGES - 1)) * 100
        st.markdown(f"""
        <div class="progress-bar">
            <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <p style="text-align: center; color: #6b7280; font-size: 0.875rem;">
            Question {st.session_state.current_page + 1} of {TOTAL_PAGES - 1}
        </p>
        """, unsafe_allow_html=True)

    st.markdown('<div class="question-container">', unsafe_allow_html=True)

    # Question 1
    if st.session_state.current_page == 0:
        st.markdown('<p class="question-title">1. How often do you use AI-powered or digital tools?</p>', unsafe_allow_html=True)
        options = ["Daily", "Weekly", "Occasionally", "Rarely / Never"]
        st.session_state.survey_data['q1'] = st.radio(
            "q1",
            options,
            index=options.index(st.session_state.survey_data['q1']) if st.session_state.survey_data['q1'] in options else None,
            label_visibility="collapsed"
        )

    # Question 2
    elif st.session_state.current_page == 1:
        st.markdown('<p class="question-title">2. How do you usually discover or adopt new tech tools?</p>', unsafe_allow_html=True)
        options = [
            "I stick to what I know.",
            "I try new tools only if someone recommends or mandates them.",
            "I explore tools if I hear they might help me.",
            "I actively seek, test, and share new tools with colleagues."
        ]
        st.session_state.survey_data['q2'] = st.radio(
            "q2",
            options,
            index=options.index(st.session_state.survey_data['q2']) if st.session_state.survey_data['q2'] in options else None,
            label_visibility="collapsed"
        )

    # Question 3
    elif st.session_state.current_page == 2:
        st.markdown('<p class="question-title">3. Have you or your team tried automating any manual tasks?</p>', unsafe_allow_html=True)
        options = ["Yes, often", "Yes, a few times", "No, not yet", "Not sure"]
        st.session_state.survey_data['q3'] = st.radio(
            "q3",
            options,
            index=options.index(st.session_state.survey_data['q3']) if st.session_state.survey_data['q3'] in options else None,
            label_visibility="collapsed"
        )

    # Question 4
    elif st.session_state.current_page == 3:
        st.markdown('<p class="question-title">4. How do you feel to use a new app, tool, or digital solutions?</p>', unsafe_allow_html=True)
        options = [
            "I tend to postpone using new tools because they often change or don't stick around.",
            "I need guidance from someone else.",
            "I can manage with a tutorial or quick help guide.",
            "I enjoy figuring it out myself and experimenting."
        ]
        st.session_state.survey_data['q4'] = st.radio(
            "q4",
            options,
            index=options.index(st.session_state.survey_data['q4']) if st.session_state.survey_data['q4'] in options else None,
            label_visibility="collapsed"
        )

    # Question 5
    elif st.session_state.current_page == 4:
        st.markdown('<p class="question-title">5. When you encounter an unfamiliar error or issue, what do you usually do?</p>', unsafe_allow_html=True)
        options = [
            "Call IT/tech support immediately",
            "Try a few basic things, but give up quickly",
            "Search online or ask peers and test possible solutions",
            "Troubleshoot systematically until I solve it"
        ]
        st.session_state.survey_data['q5'] = st.radio(
            "q5",
            options,
            index=options.index(st.session_state.survey_data['q5']) if st.session_state.survey_data['q5'] in options else None,
            label_visibility="collapsed"
        )

    # Question 6
    elif st.session_state.current_page == 5:
        st.markdown('<p class="question-title">6. Which areas of your work could benefit most from AI or digitalization?</p>', unsafe_allow_html=True)
        st.markdown('<p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">Select all that apply</p>', unsafe_allow_html=True)
        options = [
            "Product Design",
            "Digital Simulation",
            "Testing & Validation",
            "Documentation",
            "Project/Workflow Management",
            "Repetitive Administrative Tasks",
            "Customer/Stakeholder Communication",
            "Knowledge Sharing & Training",
            "Other (please specify)"
        ]
        selected = []
        for option in options:
            if st.checkbox(option, value=option in st.session_state.survey_data['q6'], key=f"q6_{option}"):
                selected.append(option)
        st.session_state.survey_data['q6'] = selected

    # Question 7
    elif st.session_state.current_page == 6:
        st.markdown('<p class="question-title">7a. Do you have any product-related problem statements that could be solved through digitalization?</p>', unsafe_allow_html=True)
        st.session_state.survey_data['q7a'] = st.text_area(
            "q7a",
            value=st.session_state.survey_data['q7a'],
            placeholder="Describe your problem statement...",
            height=150,
            label_visibility="collapsed"
        )

        st.markdown('<p class="question-title" style="margin-top: 2rem;">7b. How big an impact would solving this problem have?</p>', unsafe_allow_html=True)
        st.session_state.survey_data['q7b'] = st.slider(
            "Impact level",
            min_value=1,
            max_value=10,
            value=st.session_state.survey_data['q7b'],
            label_visibility="collapsed"
        )
        col1, col2, col3 = st.columns([1, 1, 1])
        with col1:
            st.markdown('<p style="text-align: left; color: #6b7280; font-size: 0.875rem;">Low Impact</p>', unsafe_allow_html=True)
        with col2:
            st.markdown(f'<p style="text-align: center; color: #2563eb; font-size: 1.5rem; font-weight: bold;">{st.session_state.survey_data["q7b"]}</p>', unsafe_allow_html=True)
        with col3:
            st.markdown('<p style="text-align: right; color: #6b7280; font-size: 0.875rem;">High Impact</p>', unsafe_allow_html=True)

    # Question 8
    elif st.session_state.current_page == 7:
        st.markdown('<p class="question-title">8. How do you feel about existing QMS tracker sheet?</p>', unsafe_allow_html=True)
        options = [
            "I am fine with current process",
            "I would like to see some digital changes",
            "I would like a new way of entering tasks with minimal efforts",
            "Others Please specify"
        ]
        st.session_state.survey_data['q8'] = st.radio(
            "q8",
            options,
            index=options.index(st.session_state.survey_data['q8']) if st.session_state.survey_data['q8'] in options else None,
            label_visibility="collapsed"
        )

    # Question 9
    elif st.session_state.current_page == 8:
        st.markdown('<p class="question-title">9. How do you usually check if a website or email is safe/authentic?</p>', unsafe_allow_html=True)
        options = [
            "I don't check / I just trust it",
            "I sometimes check but not sure what to look for",
            "I check sender, links, and security indicators",
            "I apply multiple checks and also use security tools"
        ]
        st.session_state.survey_data['q9'] = st.radio(
            "q9",
            options,
            index=options.index(st.session_state.survey_data['q9']) if st.session_state.survey_data['q9'] in options else None,
            label_visibility="collapsed"
        )

    # Question 10
    elif st.session_state.current_page == 9:
        st.markdown('<p class="question-title">10. Which repetitive tasks take up the most time in your work?</p>', unsafe_allow_html=True)
        st.markdown('<p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">Select all that apply</p>', unsafe_allow_html=True)
        options = [
            "Copy-pasting data between files or systems",
            "Manual report generation",
            "Approving or routing documents",
            "Responding to common queries",
            "Data cleaning or reformatting",
            "Scheduling meetings or reminders",
            "Monitoring dashboards or logs",
            "Sorting/tagging emails or files",
            "Preparing presentations or status updates",
            "Other (please specify)"
        ]
        selected = []
        for option in options:
            if st.checkbox(option, value=option in st.session_state.survey_data['q10'], key=f"q10_{option}"):
                selected.append(option)
        st.session_state.survey_data['q10'] = selected

        st.markdown('<p style="font-weight: 500; color: #374151; margin-top: 1.5rem; margin-bottom: 0.75rem;">Elaborate on repetitive tasks:</p>', unsafe_allow_html=True)
        st.session_state.survey_data['q10_elaborate'] = st.text_area(
            "q10_elaborate",
            value=st.session_state.survey_data['q10_elaborate'],
            placeholder="Provide additional details about your repetitive tasks...",
            height=150,
            label_visibility="collapsed"
        )

    # Question 11
    elif st.session_state.current_page == 10:
        st.markdown('<p class="question-title">11. If you could automate your most tedious, manual, or challenging task, which ones would you automate?</p>', unsafe_allow_html=True)
        st.session_state.survey_data['q11'] = st.text_area(
            "q11",
            value=st.session_state.survey_data['q11'],
            placeholder="Describe the tasks you would like to automate...",
            height=180,
            label_visibility="collapsed"
        )

    # Question 12
    elif st.session_state.current_page == 11:
        st.markdown('<p class="question-title">12. How confident are you in your ability to use new digital tools without formal training?</p>', unsafe_allow_html=True)
        options = [
            "Not confident at all",
            "Slightly confident",
            "Moderately confident",
            "Very confident",
            "Expert / I help others learn"
        ]
        st.session_state.survey_data['q12'] = st.radio(
            "q12",
            options,
            index=options.index(st.session_state.survey_data['q12']) if st.session_state.survey_data['q12'] in options else None,
            label_visibility="collapsed"
        )

    # Question 13
    elif st.session_state.current_page == 12:
        st.markdown('<p class="question-title">13. How do you usually learn new digital tools?</p>', unsafe_allow_html=True)
        st.markdown('<p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">Select all that apply</p>', unsafe_allow_html=True)
        options = [
            "Trial and error",
            "Tutorials or guides",
            "Formal training/workshops",
            "AI Tools (like Direct chat, ChatGPT)",
            "Asking colleagues/mentors",
            "Online forums/communities",
            "Other (please specify)"
        ]
        selected = []
        for option in options:
            if st.checkbox(option, value=option in st.session_state.survey_data['q13'], key=f"q13_{option}"):
                selected.append(option)
        st.session_state.survey_data['q13'] = selected

    # Question 14
    elif st.session_state.current_page == 13:
        st.markdown('<p class="question-title">14. How excited are you about future technologies?</p>', unsafe_allow_html=True)
        options = [
            "Not interested",
            "Curious but skeptical",
            "Interested and open to learning",
            "Very excited and already exploring them"
        ]
        st.session_state.survey_data['q14'] = st.radio(
            "q14",
            options,
            index=options.index(st.session_state.survey_data['q14']) if st.session_state.survey_data['q14'] in options else None,
            label_visibility="collapsed"
        )

    # Question 15
    elif st.session_state.current_page == 14:
        st.markdown('<p class="question-title">15. Are you interested in learning and participating in digitalization solutions?</p>', unsafe_allow_html=True)
        options = [
            "Yes, I am interested to learn and develop digitalization solutions",
            "Yes, I am interested to learn for upskilling",
            "Not interested"
        ]
        st.session_state.survey_data['q15'] = st.radio(
            "q15",
            options,
            index=options.index(st.session_state.survey_data['q15']) if st.session_state.survey_data['q15'] in options else None,
            label_visibility="collapsed"
        )

    # Question 16
    elif st.session_state.current_page == 15:
        st.markdown('<p class="question-title">16. What are your feelings about increased digitalization and AI in your work?</p>', unsafe_allow_html=True)
        st.markdown('<p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">Select all that apply</p>', unsafe_allow_html=True)
        options = [
            "I am concerned about job replacement or reduced relevance.",
            "I am optimistic that AI can assist me in day-to-day work.",
            "I feel neutral about it / I welcome it.",
            "I am excited about learning and adapting to new technologies.",
            "I feel overwhelmed by the pace of change.",
            "Other (please specify)"
        ]
        selected = []
        for option in options:
            if st.checkbox(option, value=option in st.session_state.survey_data['q16'], key=f"q16_{option}"):
                selected.append(option)
        st.session_state.survey_data['q16'] = selected

    # Submit Page
    elif st.session_state.current_page == 16:
        if st.session_state.is_submitted:
            st.markdown("""
            <div class="success-message">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2 style="color: #166534; font-size: 2rem; margin-bottom: 1rem;">Thank You!</h2>
                <p style="color: #15803d; font-size: 1.125rem; margin-bottom: 1.5rem;">
                    Your response has been submitted successfully.
                </p>
                <div style="background-color: #f0fdf4; border: 2px solid #86efac; border-radius: 0.5rem; padding: 1.5rem; max-width: 600px; margin: 0 auto;">
                    <p style="color: #166534; font-size: 0.875rem;">
                        Your feedback will help us better understand how to improve digitalization and AI adoption in our organization.
                    </p>
                </div>
            </div>
            """, unsafe_allow_html=True)

            st.markdown("### Your Survey Responses")

            # Create a formatted view of responses
            response_data = {
                'Question': [],
                'Answer': []
            }

            questions_map = {
                'q1': '1. How often do you use AI-powered or digital tools?',
                'q2': '2. How do you usually discover or adopt new tech tools?',
                'q3': '3. Have you or your team tried automating any manual tasks?',
                'q4': '4. How do you feel to use a new app, tool, or digital solutions?',
                'q5': '5. When you encounter an unfamiliar error or issue, what do you usually do?',
                'q6': '6. Which areas of your work could benefit most from AI or digitalization?',
                'q7a': '7a. Problem statements that could be solved through digitalization',
                'q7b': '7b. Impact level (1-10)',
                'q8': '8. How do you feel about existing QMS tracker sheet?',
                'q9': '9. How do you usually check if a website or email is safe/authentic?',
                'q10': '10. Which repetitive tasks take up the most time in your work?',
                'q10_elaborate': '10. Elaborate on repetitive tasks',
                'q11': '11. Tasks you would like to automate',
                'q12': '12. Confidence in using new digital tools without formal training',
                'q13': '13. How do you usually learn new digital tools?',
                'q14': '14. How excited are you about future technologies?',
                'q15': '15. Interest in learning and participating in digitalization solutions',
                'q16': '16. Feelings about increased digitalization and AI in your work'
            }

            for key, question in questions_map.items():
                value = st.session_state.survey_data[key]
                if isinstance(value, list):
                    value = ', '.join(value) if value else 'No selection'
                elif value is None or value == '':
                    value = 'No answer'
                response_data['Question'].append(question)
                response_data['Answer'].append(str(value))

            df = pd.DataFrame(response_data)
            st.dataframe(df, use_container_width=True, hide_index=True)

            # Download options
            st.markdown("### Download Your Responses")
            col1, col2 = st.columns(2)

            with col1:
                csv = df.to_csv(index=False)
                st.download_button(
                    label="Download as CSV",
                    data=csv,
                    file_name=f"survey_response_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                    mime="text/csv"
                )

            with col2:
                json_str = json.dumps(st.session_state.survey_data, indent=2)
                st.download_button(
                    label="Download as JSON",
                    data=json_str,
                    file_name=f"survey_response_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                    mime="application/json"
                )

        else:
            st.markdown("""
            <div class="submit-container">
                <h2 style="color: #1e40af; font-size: 2rem; margin-bottom: 1rem;">Ready to Submit?</h2>
                <p style="color: #1e3a8a; font-size: 1.125rem; margin-bottom: 1.5rem;">
                    Please review your answers before submitting. Once submitted, you won't be able to make changes.
                </p>
            </div>
            """, unsafe_allow_html=True)

            if st.button("Submit Survey", type="primary", use_container_width=True):
                st.session_state.is_submitted = True
                st.rerun()

            st.markdown("""
            <p style="text-align: center; color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">
                By submitting this survey, you acknowledge that your responses will be used to improve our organization's digital initiatives.
            </p>
            """, unsafe_allow_html=True)

    st.markdown('</div>', unsafe_allow_html=True)

    # Navigation buttons (hide on submit page)
    if st.session_state.current_page < TOTAL_PAGES - 1:
        st.markdown('<div style="margin-top: 2rem;"></div>', unsafe_allow_html=True)
        col1, col2, col3 = st.columns([1, 2, 1])

        with col1:
            if st.session_state.current_page > 0:
                st.button("← Previous", on_click=prev_page, use_container_width=True)

        with col3:
            if st.session_state.current_page < TOTAL_PAGES - 1:
                st.button(
                    "Next →",
                    on_click=next_page,
                    disabled=not is_page_valid(),
                    use_container_width=True,
                    type="primary"
                )

# Footer
st.markdown("""
<div style="text-align: center; margin-top: 3rem; padding: 2rem; color: #6b7280; font-size: 0.875rem;">
    <p>Your responses are confidential and will be used to improve our digital initiatives.</p>
</div>
""", unsafe_allow_html=True)
