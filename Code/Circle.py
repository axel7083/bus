import Point2D


class Circle:
    def __init__(self, point: Point2D, radius: float):
        self.__center = point
        self.__radius = radius

    def get_center(self) -> Point2D:
        return self.__center

    def get_radius(self) -> float:
        return self.__radius
