from Circle import Circle
from Point2D import Point2D

class PopDensity(Circle):
    def __init__(self, point : Point2D, densityLevel: int) -> None:
        super().__init__(point, densityLevel*1.5)
        self.__densityLevel = densityLevel

    def get_density_level(self) -> int:
        return self.__densityLevel

    def set_density_level(self, newDensity : int) -> None:
        self.set_radius(newDensity*1.5)
        self.__densityLevel = newDensity