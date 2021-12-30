from typing import List, Union


class Node:
    def __init__(self, operand_one: Union[int, float], operand_two: Union[int, float], operator: str, value: Union[int, float]):
        self._operator: str = operator
        self._value: Union[int, float] = value
        self._operand_one: Union[int, float] = operand_one
        self._operand_two: Union[int, float] = operand_two
        self._infix: str = f"{operand_one} {operator} {operand_two} = {operand_one + operand_two}"

    def get_operands(self) -> List[Union[int, float]]:
        return [self._operand_one, self._operand_two]

    def get_operator(self) -> str:
        return self._operator

    def get_value(self) -> Union[int, float]:
        return self._value

    def get_infix(self) -> str:
        return self._infix
