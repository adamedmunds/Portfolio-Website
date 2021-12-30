import re
from json import loads
from typing import List, Union, Callable

from Graph.Node import Node
from Api.ReturnObject import ApiReturnObject
from Api.Exceptions.StackErrorApi import create_error_object


def calculate(a, b, operator) -> Union[int, float]:
    return operator_to_function(operator)(a, b)


def add(a: int, b: int) -> int:
    return a + b


def sub(a: int, b: int) -> int:
    return a - b


def mul(a: int, b: int) -> int:
    return a * b


def div(a: int, b: int) -> float:
    return a / b


def operator_to_function(operator) -> Callable[[int, int], Union[int, float]]:
    switch = {"+": add, "-": sub, "*": mul, "/": div}
    return switch.get(operator)


def rpn_api_endpoint(user_input: str) -> str:
    data = ApiReturnObject()
    OPERATORS: List[str] = ["+", "-", "*", "/"]

    valid_rpn: List[str] = re.findall(r"(\d+|[\+\-\*\/])", user_input)
    ignored_rpn: List[str] = re.findall(r"[^\d+\+\-\*\/\s]", user_input)

    stack: List[Union[int, float]] = []
    node_list: List[Node] = []

    for char in valid_rpn:
        if char not in OPERATORS:
            stack.append(int(char))
        else:
            if len(stack) == 1:
                return create_error_object(
                    "Something went wrong, check your input", user_input
                )
            operand_two, operand_one = stack.pop(), stack.pop()
            if (operand_one == 0 or operand_two == 0) and char == "/":
                return create_error_object("You can't divide by 0", user_input)
            value = calculate(operand_one, operand_two, char)
            node_list.append(Node(operand_one, operand_two, char, value))
            stack.append(value)
    if len(stack) > 1:
        return create_error_object("Too many operands", user_input)

    data.user_input = user_input
    data.total = stack[0]
    data.ignored = ignored_rpn
    data.nodes = node_list

    return loads(data.to_json())
