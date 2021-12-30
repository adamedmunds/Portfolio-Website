from json import loads
from Api.ReturnObject import ApiReturnObject


def create_error_object(error_msg: str, user_input: str):
    error = ApiReturnObject()
    error.user_input = user_input
    error.error = error_msg
    return loads(error.to_json())
