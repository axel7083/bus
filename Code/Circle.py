from cmath import sqrt
from .Point2D import Point2D

""" This class reprensent a circle in a 2 dimentionnal space defined by 2 values. It's center that is defined by a Point2D, and it's radius defined by a float.
This class is useful to represent zones with their density of population.

@Author: Jean Maccou
"""


class Circle:
    def __init__(self, point: Point2D, radius: float):
        """ The constructor of this class need 2 parameters.
        :param point: a Point2D that represent the center of the circle.
        :param radius: a float that represent the center of the circle.
        """
        self.__center = point
        self.__radius = radius

    def get_center(self) -> Point2D:
        """
        :return: the center of the circle as a Point2D.
        """
        return self.__center

    def get_radius(self) -> float:
        """
        :return: the radius of the circle as a float.
        """
        return self.__radius

    def set_radius(self, newRadius: float) -> None:
        """
        :param newRadius: the new radius of the circle.
        """
        self.__radius = newRadius

    def is_on_disk(self, point: Point2D) -> bool:
        """ This function check if a point is on the disk defined by the circle.
        To do that we calculate the distance between the point and the center of the circle and we check if it's lower than the radius of the circle.
        
        :param point: a Point2D that represent a point that we want to check if it's on the disk or not.
        """
        distance = sqrt((self.__center.get_x() - point.get_x()) ** 2 + (self.__center.get_y() - point.get_y()) ** 2)
        return distance < self.__radius
