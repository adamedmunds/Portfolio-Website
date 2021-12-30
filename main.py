import re
from typing import List, Union

from Graph.Node import Node
from Functions import calculate
from Exceptions import StackError

OPERATORS: List[str] = ["+", "-", "*", "/"]


def main(user_input: str) -> None:
    valid_rpn: List[str] = re.findall(r"(\d+|[\+\-\*\/])", user_input)
    ignored_rpn: List[str] = re.findall(r"[^\d+\+\-\*\/\s]", user_input)

    stack: List[Union[int, float]] = []
    node_list: List[Node] = []

    for char in valid_rpn:
        if char not in OPERATORS:
            stack.append(int(char))
        else:
            if len(stack) == 1:
                raise StackError("There should be two operands, try adding a space between the first two numbers")
            operand_two, operand_one = stack.pop(), stack.pop()
            if operand_one == 0 or operand_two == 0:
                raise ZeroDivisionError
            value = calculate(operand_one, operand_two, char)
            node_list.append(Node(operand_one, operand_two, char, value))
            stack.append(value)
            if len(stack) > 1:
                raise StackError(f"Try adding another operator between {operand_one} and {operand_two}")

    if ignored_rpn:
        print(f"Ignoring: {', '.join(ignored_rpn)}")

    print(f"RPN: '{user_input}'\nTotal: {stack[0]}")


if __name__ == "__main__":
    main("1 2+3/5+ADAM2*3*5/3+")
