def calculate(a, b, operator):
    return operator_to_function(operator)(a, b)


def add(a: int, b: int) -> int:
    return a + b


def sub(a: int, b: int) -> int:
    return a - b


def mul(a: int, b: int) -> int:
    return a * b


def div(a: int, b: int) -> float:
    return a / b


def operator_to_function(operator):
    switch = {
        "+": add,
        "-": sub,
        "*": mul,
        "/": div
    }
    return switch.get(operator)
