import unittest
from Functions import calculate


class TestCalculateFunctions(unittest.TestCase):

    def test_add(self):
        self.assertEqual(calculate(0, 0, "+"), 0)
        self.assertEqual(calculate(20, 10, "+"), 30)
        self.assertEqual(calculate(20, -40, "+"), -20)
        self.assertEqual(calculate(-20, 40, "+"), 20)
        self.assertEqual(calculate(-40, -40, "+"), -80)

    def test_sub(self):
        self.assertEqual(calculate(0, 0, "-"), 0)
        self.assertEqual(calculate(20, 10, "-"), 10)
        self.assertEqual(calculate(20, -40, "-"), 60)
        self.assertEqual(calculate(-20, 40, "-"), -60)
        self.assertEqual(calculate(-40, -40, "-"), 0)

    def test_mul(self):
        self.assertEqual(calculate(0, 0, "*"), 0)
        self.assertEqual(calculate(20, 10, "*"), 200)
        self.assertEqual(calculate(20, -40, "*"), -800)
        self.assertEqual(calculate(-20, 40, "*"), -800)
        self.assertEqual(calculate(-40, -40, "*"), 1600)

    def test_div(self):
        with self.assertRaises(ZeroDivisionError):
            calculate(0, 0, "/")
        self.assertEqual(calculate(20, 10, "/"), 2)
        self.assertEqual(calculate(20, -40, "/"), -0.5)
        self.assertEqual(calculate(-20, 40, "/"), -0.5)
        self.assertEqual(calculate(-40, -40, "/"), 1)
