#!flask/bin/python
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import urllib
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*" : {"origins": "*"}}, support_credentials = True)

@app.route('/', methods=['GET'])
def hi():
    return "Hello World"

@app.route('/api/resolver', methods=['GET'])
def resolver():
    Flask.Response.headers['Access-Control-Allow-Origin'] = 'https://compose.mixmax.com'
    Flask.Response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With'
    Flask.Response.headers['Access-Control-Allow-Credentials'] = 'true'
    site = request.args.get('text')
    summaryWebsite = "https://api.spotify.com/v1/search?q=" + urllib.quote_plus(site) + "&type=track"
    print(summaryWebsite)
    response = requests.get(summaryWebsite)
    print(response.status_code)
    content = response.json() 
    song = content["tracks"]["items"][0]["album"]["artists"][0]["external_urls"]["spotify"]
    song2 = song.split("/")
    toPrint =  """<iframe src="https://embed.spotify.com/?uri=spotify:artist:""" + song2[4] + """"width="300" height="380" frameborder="0" allowtransparency="true"></iframe>"""
    if song:
        data = {
            'body': toPrint
        }
        return toPrint, 200
    else:
        data = {
            'message': 'NA'
        }
        return jsonify(data), 400
    return "Did not find song"

@app.route('/api/suggestions', methods=['GET', 'POST'])
def suggestions():
    data = {
        'title': 'hi hi',
        'text': 'test test',
        'resolve': 'true'
    }
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)