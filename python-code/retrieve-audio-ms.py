from flask import Flask, send_from_directory, url_for, request
import os
import logging
import random

app = Flask(__name__)

if not app.debug:
    # Set up logging to a file
    handler = logging.FileHandler('retrieve-audio-ms.log')  # Path to the log file
    handler.setLevel(logging.INFO)  # Log level
    app.logger.addHandler(handler)



@app.route('/get_letter', methods=['GET'])
def get_letter():

    
    dir_path = '/audio-files/'
    file_list = os.listdir(app.static_folder + dir_path)
    audio_file = random.choice(file_list)

    #changes the source to point to the flask app
    src = request.url_root.rstrip('/') + url_for('static', filename=f'{dir_path}{audio_file}')

    return f'<audio controls autoplay src="{src}" id="audio-player"></audio>'
