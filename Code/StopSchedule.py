from datetime import date
from typing import List

""" This class implements stop schedules for a bus line.
We consider a stop schedule as 2 parameters, it's order and it's schedule as a list of dates.
"""

class StopSchedule:

    def __init__(self, order: int, schedule: List[date]):
        """
        :param order: The order of the stop schedule represented as an int.
        :param schedule: The schedule of the stop schedule represented as a list of dates.
        """
        self.__order = order
        self.__schedule = schedule

    def get_order(self) -> int:
        """
        :return: The order of the stop schedule.
        """
        return self.__order

    def get_schedule(self) -> List[date]:
        """
        :return: a copy of the values of the schedules to not modify the values if we modify the table.
        """
        return self.__schedule.copy()

    def set_order(self, order) -> None:
        self.__order = order
