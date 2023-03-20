const sendToSpeechToTextAPI = async (audioData) => {
    const backendUrl = 'https://your-backend-server.com/speech-to-text'; // Replace with your backend server URL
  
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: {
            content: audioData,
          },
        }),
      });
  
      const data = await response.json();
      if (data.transcription) {
        setTranscription(data.transcription);
      } else {
        setTranscription('No speech recognized');
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
    }
  };