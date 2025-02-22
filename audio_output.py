# Testing if i can get sound
import sounddevice as sd
import numpy as np

fs = 44100  
duration = 5
frequency = 440

t = np.linspace(0, duration, int(fs * duration), endpoint=False)
audio = 0.5 * np.sin(2 * np.pi * frequency * t)

sd.play(audio, samplerate=fs)
sd.wait()