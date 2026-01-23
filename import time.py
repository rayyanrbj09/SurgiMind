import time
import pygame
import sys

# ---------------- CONFIG ----------------
SONG_FILE = "song.mp3"

# (time_in_seconds, lyric_line)
LYRICS = [
    (0.0,  "🎧 Playing now..."),
    (5.2,  "I remember when I first saw you"),
    (10.8, "Standing there like time froze"),
    (16.5, "Didn’t know that moment"),
    (22.0, "Would change my whole world"),
    (28.4, "✨"),
]
# ----------------------------------------

def clear_terminal():
    sys.stdout.write("\033[2J\033[H")
    sys.stdout.flush()

def play_song_with_lyrics():
    pygame.mixer.init()
    pygame.mixer.music.load(SONG_FILE)
    pygame.mixer.music.play()

    start_time = time.time()
    lyric_index = 0

    clear_terminal()

    while pygame.mixer.music.get_busy():
        current_time = time.time() - start_time

        if lyric_index < len(LYRICS):
            lyric_time, lyric_text = LYRICS[lyric_index]

            if current_time >= lyric_time:
                clear_terminal()
                print("\n")
                print(lyric_text.center(60))
                lyric_index += 1

        time.sleep(0.05)

    pygame.mixer.quit()

if __name__ == "__main__":
    play_song_with_lyrics()
