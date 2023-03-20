import os
import argparse
import pprint
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from search.elastic import ElasticConnect
from search.search_engine import SearchEngine
from ocr.google_vision import GoogleVision
from speech_to_text.google_stt import GoogleSpeechToText

# ---------------------------------------------------------------------------- #
#                                   Warnings                                   #
# ---------------------------------------------------------------------------- #

import warnings
warnings.filterwarnings("ignore")

# ---------------------------------------------------------------------------- #
#                                   Constants                                  #
# ---------------------------------------------------------------------------- #
load_dotenv()
ELASTIC_ADDRESS = os.environ.get("ELASTIC_ADDRESS")
ELASTIC_USERNAME = os.environ.get("ELASTIC_USERNAME")
ELASTIC_PASSWORD = os.environ.get("ELASTIC_PASSWORD")
ELASTIC_CA_CERTS = os.environ.get("ELASTIC_CA_CERTS")
ELASTIC_INDEX = os.environ.get("ELASTIC_INDEX")

# ---------------------------------------------------------------------------- #
#                              Command Line Parser                             #
# ---------------------------------------------------------------------------- #

# Parse commands
parser = argparse.ArgumentParser()
parser.add_argument(
    "--populate",
    action='store',
    help="Dataset path to store dataset to elasticsearch"
)
parser.add_argument(
    "--search_info",
    action='store',
    help="Image path to find information regarding the brand name"
)
parser.add_argument(
    "--run_flask",
    action='store',
    help="Run Flask Backend"
)
parser.add_argument(
    "--test_pic_search",
    action='store',
    help="Run Flask Backend"
)
args = parser.parse_args()
data_path = args.populate
img_path = args.search_info
run_flask = args.run_flask

# ---------------------------------------------------------------------------- #
#                                 Instantiation                                #
# ---------------------------------------------------------------------------- #

elastic = ElasticConnect(
    addr=ELASTIC_ADDRESS,
    ca_certs=ELASTIC_CA_CERTS,
    username=ELASTIC_USERNAME,
    password=ELASTIC_PASSWORD
)
search_engine = SearchEngine(elastic)
google_vision = GoogleVision()
google_speech_to_text = GoogleSpeechToText()

# ---------------------------------------------------------------------------- #
#                                     Flask                                    #
# ---------------------------------------------------------------------------- #
app = Flask(__name__)

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    audio_data = request.json['audio']['content']
    transcription = google_speech_to_text.speech_recognize(audio_data)
    if transcription:
        return jsonify({"transcription": transcription}), 200
    else:
        return jsonify({"transcription": transcription}), 500

@app.route('/ocr', methods=['POST'])
def ocr():
    base64_image = request.json['image']
    texts = google_vision.detect_text_from_base64(base64_image)
    if texts:
        return jsonify({"text": texts}), 200
    else:
        return jsonify({"text": texts}), 500

@app.route('/search', methods=['POST'])
def search():
    query = request.json["query"]
    result = search_engine.search(query=query, index=ELASTIC_INDEX)
    if result:
        return jsonify({"result": result}), 200
    else:
        return jsonify({"result": result}), 500

@app.route('/speech-to-text-search', methods=['POST'])
def speech_to_text_search():
    audio_data = request.json['audio']['content']
    transcription = google_speech_to_text.speech_recognize(audio_data)
    if not transcription:
        return jsonify({"can't find the product!"})
    result = search_engine.search(query=transcription, index=ELASTIC_INDEX)
    if result:
        return jsonify({"result": result}), 200
    else:
        return jsonify({"result": result}), 500

@app.route('/ocr-search', methods=['POST'])
def ocr_search():
    base64_image = request.json['image']
    texts = google_vision.detect_text_from_base64(base64_image)
    if not texts:
        return jsonify({"can't find the product!"}), 500
    result = search_engine.search(query=texts, index=ELASTIC_INDEX)
    if result:
        return jsonify({"result": result}), 200
    else:
        return jsonify({"result": result}), 500

# ---------------------------------------------------------------------------- #
#                                     Main                                     #
# ---------------------------------------------------------------------------- #
if __name__ == "__main__":

    if run_flask:
        app.run(port=5000, debug=True)
    elif data_path:
        elastic.populate_data_from_csv(index=ELASTIC_INDEX, file_path=data_path)
    elif img_path:
        text = google_vision.detect_text(img_path)
        result = search_engine.search(query=text, index=ELASTIC_INDEX)
        print(f"Text: {text}\n\n")
        print(f"Result:\n")
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(result)