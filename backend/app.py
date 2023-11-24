from flask import Flask
import time
import logging

app = Flask(__name__)

if not app.debug:
    # Set up logging to a file
    handler = logging.FileHandler('flask_app.log')  # Path to the log file
    handler.setLevel(logging.INFO)  # Log level
    app.logger.addHandler(handler)

start_time = None
running = False

@app.route('/start-timer', methods=['POST'])
def start_timer():  # put application's code here
    global start_time, running
    if not running:
        start_time = time.time()
        running = True
    return '', 204

@app.route('/stop-timer', methods=['POST'])
def stop_timer():
    global running
    running = False
    return '', 204

@app.route('/get-time', methods=['GET'])
def get_time():
    if running and start_time:
        elapsed_time = time.time() - start_time
    else:
        elapsed_time = 0
    return '{:.2f}'.format(elapsed_time)

if __name__ == '__main__':
    app.run()

