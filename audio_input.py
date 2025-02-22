import sounddevice as sd
import scipy.io.wavfile as wav

fs = 44100  # Sample rate
duration = 5  # Duration in seconds

print("Recording...")
recording = sd.rec(int(duration * fs), samplerate=fs, channels=1)
sd.wait()  # Wait until recording is finished
print("Recording complete.")

wav.write("output.wav", fs, recording)