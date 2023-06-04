from streamlit_webrtc import webrtc_streamer, RTCConfiguration
import streamlit as st
import av

import pickle
import cv2
import mediapipe as mp
import numpy as np

from random import choice

labels_dict = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "L",
    10: "O",
    11: "U",
    12: "V",
    13: "W",
    14: "Y",
}


letters = list(labels_dict.values())

lucky = choice(letters)
# Create an empty placeholder for the image
image_placeholder = st.empty()

# Update the image placeholder when `lucky` changes
image_placeholder.image(f"images/{lucky}.png", width=200)

st.title("Learn Sign Language")
st.text("Communicate with your friends, loved ones, or any person with accessibility issues.")

print("init lucky: ", lucky)

temp = True
count = 0

model_dict = pickle.load(open("./model.p", "rb"))
model = model_dict["model"]
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

class VideoProcessor:
    global lucky
    print("lucky start: ", lucky)
    
    def recv(self, frame, ):
        print("lucky recv: ", lucky)
        frame = frame.to_ndarray(format="bgr24")

        # Process the frame here.

        data_aux = []
        x_ = []
        y_ = []

        H, W, _ = frame.shape

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = hands.process(frame_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,  # image to draw
                    hand_landmarks,  # model output
                    mp_hands.HAND_CONNECTIONS,  # hand connections
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style(),
                )

            for hand_landmarks in results.multi_hand_landmarks:
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y

                    data_aux.append(x)
                    data_aux.append(y)

                    x_.append(x)
                    y_.append(y)

            x1 = int(min(x_) * W)
            y1 = int(min(y_) * H)

            x2 = int(max(x_) * W)
            y2 = int(max(y_) * H)

            prediction = model.predict([np.asarray(data_aux)])

            predicted_character = labels_dict[int(prediction[0])]
            print(predicted_character, "is predicted")
            print("lucky is ", lucky)

            # graphics in the bounding box
            cv2.putText(
                frame,
                predicted_character,
                (x1, y1),
                cv2.FONT_HERSHEY_SIMPLEX,
                1.3,
                (0, 255, 0),
                3,
                cv2.LINE_AA,
            )

            if predicted_character == lucky:
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 4)
                cv2.putText(
                frame,
                'Right!',
                (x2, y2),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 255, 0),
                3,
                cv2.LINE_AA,
                )
            else:
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 4)
                cv2.putText(
                frame,
                'Wrong!',
                (x2, y2),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                3,
                cv2.LINE_AA,
                )

        return av.VideoFrame.from_ndarray(frame, format="bgr24")

# if temp:
#     lucky = choice(letters)
#     st.image(f"images/{lucky}.png", width=200)
#     st.text(lucky)
#     temp = False
#     print("init lucky: ", lucky)

# # stream in web
webrtc_streamer(
    key="key",
    video_processor_factory=VideoProcessor,
    media_stream_constraints={"video": True, "audio": False},
    rtc_configuration=RTCConfiguration(
        {"iceServers": [{"urls": ["stun:stun.l.google.com:19302"]}]}
    ),
)