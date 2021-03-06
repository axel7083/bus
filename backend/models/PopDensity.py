from .Circle import Circle
from .Point2D import Point2D

""" This Class is used to represent a density of population on a map. It depends on a point and a level of density.
@Author: Jean Maccou
"""


class PopDensity(Circle):
    def __init__(self, point: Point2D, densityLevel: int) -> None:
        """ Constructor for the PopDensity.
        :param point: the center of the circle that represent the density.
        :param densityLevel: the density level to set the radius.
        """
        super().__init__(point, densityLevel * 1.5)
        self.__densityLevel = densityLevel

    def get_density_level(self) -> int:
        """
        :return: the densityLevel as an int.
        """
        return self.__densityLevel

    def set_density_level(self, newDensity: int) -> None:
        """
        :param newDensity: the new density to set for the density.
        """
        self.set_radius(newDensity * 1.5)
        self.__densityLevel = newDensity