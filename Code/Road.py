from .Line import Line, LineMath
from .Point2D import Point2D

"""
@Author: cobrecht
"""


class Road:
    """
    class representing a Road, a road is characterized by a line, a value of traffic and a speedlimit.

    :param position: the line representing the position of the road
    :param traffic: a float which is a factor by which the speedlimit will be multiplied to get the effective speed
    :param speedlimit: the speed limit of the road
    """

    def __init__(self, position: Line, traffic: float, speedlimit: int):
        self.__position = position
        self.__traffic = traffic
        self.__speedlimit = speedlimit
        self.__equation = self.__position.get_parameters()
        self.__begin_perpendicular = LineMath.get_perpendicular(
            self.__equation[0],
            self.__equation[1],
            self.__position.get_begin_point()
        )
        self.__end_perpendicular = LineMath.get_perpendicular(
            self.__equation[0],
            self.__equation[1],
            self.__position.get_end_point()
        )

    def get_position(self) -> Line:
        return self.__position

    def get_traffic(self) -> float:
        return self.__traffic

    def get_speed_limit(self) -> int:
        return self.__speedlimit

    def belongs(self, point: Point2D, tolerance: float) -> bool:
        """
        A = begining of a road \n
        B = ending of a road \n
        ▬ = road \n
        ─ = limit of the tolerance zone \n \n \n


        .(x1;y1)\n
        ┌───────────────────────────┐  ^\n
        |         .(x2;y2)          |  | tolerance X\n
        |                           |  v\n
        |A▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬B|\n
        |                           |  ^\n
        |                           |  | tolerance X\n
        └───────────────────────────┘  v\n\n

        We have a road from a point A to a point B with the length D[AB].
        To determine if a bus stop is on the road, we surround the road AB with a rectangle (width : 2X and length: [AB])
        and we check if the point is inside the rectangle(see drawing above) .
        In the example above, the point (x1;y1) does not belong to the road but the point(x2;y2) does.

        :param point: the point to check
        :param tolerance: the size of the tolerance zone
        :return: true if the point belongs to the road, false otherwise
        """
        if tolerance < 0:
            raise ValueError("Tolerance is a distance, a distance must be positive")

        # if our perpendiculars to the road are parallel to the y axis then we can't apply the general test
        # as it will produce a division by zero error
        if self.__end_perpendicular[1] == 0:
            if max(self.__position.get_begin_point().get_x(),
                   self.__position.get_end_point().get_x()) < point.get_x() or \
                    point.get_x() < min(self.__position.get_begin_point().get_x(),
                                        self.__position.get_end_point().get_x()):
                return False
        else:
            begin_y = (self.__begin_perpendicular[0] * point.get_x() + self.__begin_perpendicular[2]) / \
                      -self.__begin_perpendicular[1]

            end_y = (self.__end_perpendicular[0] * point.get_x() + self.__end_perpendicular[2]) / \
                    -self.__end_perpendicular[1]
            # Let's draw two infinite perpendicular lines to the road, one goes through the beginning of the road,
            # the other through his end. We check here that the point is between those two lines.
            if max(begin_y, end_y) < point.get_y() or point.get_y() < min(begin_y, end_y):
                return False

        perpendicular = (
            self.__equation[1],
            -self.__equation[0],
            -self.__equation[1] * point.get_x() + self.__equation[0] * point.get_y()
        )

        intersection_y = (self.__equation[0] * perpendicular[2] - self.__equation[2] * perpendicular[0]) / \
                         (-self.__equation[0] * perpendicular[1] + self.__equation[1] * perpendicular[0])

        # If the perpendicular is horizontal, then the road is vertical.
        if perpendicular[0] != 0:
            intersection_x = (perpendicular[1] * intersection_y + perpendicular[2]) / -perpendicular[0]
        else:
            intersection_x = (self.__equation[1] * intersection_y + self.__equation[2]) / -self.__equation[0]

        return (point.get_x() - intersection_x) ** 2 + (point.get_y() - intersection_y) ** 2 <= tolerance ** 2


if __name__ == "__main__":
    r1 = Road(Line(Point2D(0, 0), Point2D(2, 1)), 0.5, 50)
    r2 = Road(Line(Point2D(0, 1), Point2D(2, 1)), 0.5, 50)
    r3 = Road(Line(Point2D(0, 1), Point2D(2, 0)), 0.5, 50)

    p1 = Point2D(2.5, -1)  # belongs to r1 but not r2 or r3
    p2 = Point2D(1, 1)  # belongs to every road
    p3 = Point2D(2.5, 1.5)  # belongs to r3 but not to r1 or r2

    print(r1.belongs(p1, 2.5))
    print(r1.belongs(p2, 2.5))
    print(r1.belongs(p3, 2.5))
    print(r2.belongs(p1, 2.5))
    print(r2.belongs(p2, 2.5))
    print(r2.belongs(p3, 2.5))
    print(r3.belongs(p1, 2.5))
    print(r3.belongs(p2, 2.5))
    print(r3.belongs(p3, 2.5))
