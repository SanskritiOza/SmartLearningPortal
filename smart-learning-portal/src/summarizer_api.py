# Flask app for API
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import PyPDF2
import docx

# Initialize summarization and QA pipelines
summarizer = pipeline("summarization", framework="pt")
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def summarize_text(text):
    try:
        from transformers import AutoTokenizer
        tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
        inputs = tokenizer(text, return_tensors="pt", truncation=False)
        input_ids = inputs["input_ids"][0]
        max_tokens = 1024
        chunk_size = max_tokens - 100  # leave buffer for special tokens
        chunks = [input_ids[i:i + chunk_size] for i in range(0, len(input_ids), chunk_size)]
        summaries = []
        for chunk in chunks:
            chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)
            summary = summarizer(chunk_text, max_length=100, min_length=30, do_sample=False)
            summaries.append(summary[0]['summary_text'])
        return "\n\n".join(summaries)
    except Exception as e:
        return f"An error occurred during summarization: {str(e)}"

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

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    summary = data.get('summary')
    question = data.get('question')
    if not summary or not question:
        return jsonify({"error": "Missing summary or question"}), 400

    # Truncate summary to 500 words (or fewer tokens)
    summary_short = ' '.join(summary.split()[:500])

    try:
        answer = qa_pipeline({'context': summary_short, 'question': question})
        return jsonify({"answer": answer['answer']})
    except Exception as e:
        return jsonify({"error": f"An error occurred during Q&A: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
