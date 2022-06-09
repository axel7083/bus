from datetime import date
from typing import List
from .Point2D import Point2D

""" This class implements interest points. Interest points are specific points (like a cinema, a restaurant, a park...) that shall interest a lot of users of the bus company.
We consider an interest point as 3 parameters, it's name, it's time table and it's position.
@Author: Jean Maccou
"""

class InterestPoint:
    def __init__(self, name: str, timetable : List[date], coordinates: Point2D):
        """
        :param name: The name of the interest point.
        :param timetable: The timetable of the interest point.
        :param coordinates: The coordinates of the interest point.
        """
        self.__name = name
        self.__timetable = timetable
        self.__coordinates = coordinates

    def get_name(self) -> str:
        return self.__name

    def get_timetable(self):
        return self.__timetable

    def get_coordinates(self) -> Point2D:
        return self.__coordinates