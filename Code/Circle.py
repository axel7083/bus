import Point2D

""" This class reprensent a circle in a 2 dimentionnal space defined by 2 values. It's center that is defined by a Point2D, and it's radius defined by a float.
This class is useful to represent zones with their density of population.

@Author: jmaccou
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

    def set_radius(self, newRadius : float):
        """
        :param newRadius: the new radius of the circle.
        """
        self.__radius = newRadius
