import base64
from google.cloud import vision
import io
import os

class GoogleVision:

    def __init__(self) -> None:
        self.client = vision.ImageAnnotatorClient()

    
    def read_img(self, path: str):

        with io.open(path, 'rb') as image_file:
            content = image_file.read()

        return vision.Image(content=content)


    def detect_text(self, path):

        # Read image
        image = self.read_img(path)

        # Detect text
        response = self.client.text_detection(image=image)
        texts = response.text_annotations
        
        return texts[0].description

    def detect_text_from_base64(self, content):

        image_data = base64.b64decode(content)

        # Read image
        image = vision.Image(content=image_data)

        # Detect text
        texts = None
        response = self.client.text_detection(image=image)
        texts = response.text_annotations

        return texts[0].description



 
if __name__ == "__main__":
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = './askcet-d8a64e15cb22.json'
    gv = GoogleVision()
    text = gv.detect_text(os.path.join("sample_pic", "makeup.jpeg"))
    print(text)
    # detect_text(os.path.join("sample_pic", "makeup2.jpeg"))