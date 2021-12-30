from json import dumps


class ApiReturnObject:
    def to_json(self) -> str:
        return dumps(self, default=lambda o: o.__dict__)
