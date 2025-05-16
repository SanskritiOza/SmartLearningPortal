import streamlit as st
from transformers import pipeline
import PyPDF2
import docx
import requests

# Initialize summarization pipeline
summarizer = pipeline("summarization", framework="pt")

def summarize_text(text):
    try:
        from transformers import AutoTokenizer

        # Load tokenizer to count tokens
        tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
        inputs = tokenizer(text, return_tensors="pt", truncation=False)
        input_ids = inputs["input_ids"][0]

        max_tokens = 1024
        chunk_size = max_tokens - 100  # leave buffer for special tokens
        chunks = [input_ids[i:i + chunk_size] for i in range(0, len(input_ids), chunk_size)]

        # Summarize each chunk
        summaries = []
        for chunk in chunks:
            chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)
            summary = summarizer(chunk_text, max_length=100, min_length=30, do_sample=False)
            summaries.append(summary[0]['summary_text'])

        return "\n\n".join(summaries)

    except Exception as e:
        return f"An error occurred during summarization: {str(e)}"

# Streamlit app
st.title("Text Summarization App")

uploaded_file = st.file_uploader("Upload a file (TXT, PDF, or DOCX)", type=["txt", "pdf", "docx"])

if uploaded_file:
    # Process the uploaded file
    if uploaded_file.type == "text/plain":
        text = uploaded_file.read().decode("utf-8")
    elif uploaded_file.type == "application/pdf":
        reader = PyPDF2.PdfReader(uploaded_file)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    elif uploaded_file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        doc = docx.Document(uploaded_file)
        text = "\n".join([para.text for para in doc.paragraphs])
    else:
        st.error("Unsupported file type")
        text = None

    if text:
        st.subheader("Original Text")
        st.text_area("Text Content", text, height=300)

        if st.button("Summarize"):
            with st.spinner("Summarizing..."):
                summary = summarize_text(text)
            st.subheader("Summary")
            st.text_area("Summary Content", summary, height=200)

# Flask app for API
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def summarize():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    if file.content_type == "text/plain":
        text = file.read().decode("utf-8")
    elif file.content_type == "application/pdf":
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        doc_file = docx.Document(file)
        text = "\n".join([para.text for para in doc_file.paragraphs])
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    summary = summarize_text(text)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)
