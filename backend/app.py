import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import PIL.Image

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Allow CORS from typical Vite frontend port
CORS(app, resources={r"/audit": {"origins": "*"}})

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def parse_llm_json(response_text):
    """Attempt to parse JSON from the LLM response, handling common formatting issues."""
    try:
        # Sometimes the LLM wraps the response in markdown code blocks
        if "```json" in response_text:
            json_str = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            json_str = response_text.split("```")[1].split("```")[0].strip()
        else:
            json_str = response_text.strip()
            
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON: {e}")
        print(f"Raw response: {response_text}")
        # Provide a safe fallback if parsing strictly fails
        return {
            "product_name": "Unknown Product",
            "brand_name": "Unknown Brand",
            "ethos_score": 50,
            "summary": f"Could not parse the detailed ethical audit summary. Raw response: {response_text[:100]}..."
        }

@app.route('/audit', methods=['POST'])
def analyze():
    # 1. Check if an image is provided in the request
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided in the request."}), 400
        
    image_file = request.files['image']
    
    if image_file.filename == '':
        return jsonify({"error": "No selected file."}), 400

    try:
        # 2. Open the image using PIL for the Gemini API
        pil_image = PIL.Image.open(image_file.stream)
        
        # 3. Define the prompt for the ethical audit
        prompt = """
        You are an expert ethical auditor and supply chain analyst. 
        Analyze the provided image of a product, barcode, or receipt.
        
        1. Identify the 'product_name' and the 'brand_name' if visible.
        2. Perform a simulated ethical audit. Based on public knowledge and your training data 
           regarding this brand/product category, evaluate potential labor practices, 
           environmental impact, and corporate responsibility. 
        3. Assign an 'ethos_score' from 0 to 100 (100 being perfectly ethical and sustainable).
        4. Provide a brief 'summary' explaining the reasoning behind the score and findings.
        
        Respond ONLY with a valid JSON object matching this exact schema:
        {
            "product_name": "string",
            "brand_name": "string",
            "ethos_score": integer,
            "summary": "string"
        }
        """

        # 4. Call the Gemini API using gemini-2.5-flash
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, pil_image]
        )
        
        # 5. Extract and parse the response
        llm_output = response.text
        audit_result = parse_llm_json(llm_output)
        
        # Ensure integers for score just in case
        if "ethos_score" in audit_result and isinstance(audit_result["ethos_score"], str):
             try:
                 audit_result["ethos_score"] = int(audit_result["ethos_score"])
             except ValueError:
                 audit_result["ethos_score"] = 50
                 
        return jsonify(audit_result), 200

    except Exception as e:
        print(f"Error during analysis: {e}")
        return jsonify({"error": f"An error occurred during image processing or analysis: {str(e)}"}), 500

if __name__ == '__main__':
    # Run the server on port 5000 in debug mode
    app.run(debug=True, host='0.0.0.0', port=5000)
