import math
import unittest

from Circle import Circle
from Point2D import Point2D


class CircleTest(unittest.TestCase):

    def setUp(self) -> None:
        self.circle = Circle(
            Point2D(0, 0),
            1
        )

    def test_is_on_disk_true(self):
        self.assertTrue(self.circle.is_on_disk(Point2D(0, 0)))
        self.assertTrue(self.circle.is_on_disk(Point2D(1, 0)))
        self.assertTrue(self.circle.is_on_disk(Point2D(0, 1)))
        self.assertTrue(self.circle.is_on_disk(Point2D(math.sqrt(2) / 2, math.sqrt(2) / 2)))

    def test_is_on_disk_false(self):
        self.assertFalse(self.circle.is_on_disk(Point2D(1, 1)))
        self.assertFalse(self.circle.is_on_disk(Point2D(1, 0.1)))
        self.assertFalse(self.circle.is_on_disk(Point2D(0.1, 1)))
        self.assertFalse(self.circle.is_on_disk(Point2D(20, 25)))
