from flask import Flask,request,send_from_directory,jsonify





app=Flask(__name__,static_folder="",template_folder="")


@app.route("/")
def index():
    return send_from_directory('.', 'index.html')

@app.route('<path:path>')
def send_asset(path):
    return send_from_directory('', path)

if __name__ == "__main__":
    app.run(debug=True)