import os
from google.cloud import speech

class GoogleSpeechToText:

    def __init__(self) -> None:
        self.client = speech.SpeechClient()

    def speech_recognize(self, content):

        audio = speech.RecognitionAudio(content=content)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="en-US"
        )

        # Detect text
        response = self.client.recognize(config=config, audio=audio)

        transcription = None
        if response.results:
            transcription = response.results[0].alternatives[0].transcript

        return transcription



if __name__ == "__main__":
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./askcet-15ed14f8078c.json"