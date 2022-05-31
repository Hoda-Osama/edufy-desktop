import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import keyFame

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=['post'])
def form():
    files = request.files
    file = files.get('file').stream.read()
    #print(file)
    FILE_OUTPUT = 'output.avi'
    if os.path.isfile(FILE_OUTPUT):
        os.remove(FILE_OUTPUT)
        # opens the file 'output.avi' which is accessable as 'out_file'
    with open(FILE_OUTPUT, "wb") as out_file:
        out_file.write(file)
        #print("file saved")
        #print(file)
    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    print("finished")
    return response


if __name__ == '__main__':
    app.run(debug=True)