import Point2D


class InterestPoint:
    def __init__(self, name: str, timetable, coordinates: Point2D):
        self.__name = name
        self.__timetable = timetable
        self.__coordinates = coordinates

    def get_name(self) -> str:
        return self.__name

    def get_timetable(self):
        return self.__timetable

    def get_coordinates(self) -> Point2D:
        return self.__coordinates
