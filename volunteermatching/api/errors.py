from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES

# Returns an error response with a given HTTP status code and message
def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Uknown Error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response

# Default bad request error response
def bad_request(message):
    return error_response(400, message)
