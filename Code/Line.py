from .Point2D import Point2D
from typing import Tuple

""" Class that we use to represent a line using two points.

@Author: Cyril Obrecht
"""


class Line:
    def __init__(self, begin: Point2D, end: Point2D):
        """
        :param begin: The beginning point of the line.
        :param end: The ending point of the line.
        """
        self.__begin_point = begin
        self.__ending_point = end

    def get_begin_point(self) -> Point2D:
        return self.__begin_point

    def get_end_point(self) -> Point2D:
        return self.__ending_point

    def get_parameters(self) -> Tuple[float, float, float]:
        """
        Returns a tuple of the form (a, b, c) representing the line
        ax + by + c= 0
        """
        a = self.__begin_point.get_y() - self.__ending_point.get_y()
        b = self.__ending_point.get_x() - self.__begin_point.get_x()
        c = a * self.__begin_point.get_x() + b * self.__begin_point.get_y()
        return a, b, -c


class LineMath:
    """
    Helper class which contains static methods to operate with lines
    """

    @staticmethod
    def get_perpendicular(a: float, b: float, point: Point2D):
        """

        :param a: the value of a in the equation ax + by + c= 0 which describes the line you want to find
         the perpendicular line to
        :param b: the value of b in the equation ax + by + c= 0 which describes the line you want to find
        :param point: the point the perpendicular must go through
        :return: Tuple[float,float,float] : a,b,c such that the line described by ax + by + c = 0 is the perpendicular
         to the line described by the parameters a and b going through `point`
        """
        return (
            b,
            -a,
            a * point.get_y() + -b * point.get_x()
        )
