from datetime import date
from typing import List


class StopSchedule:

    def __init__(self, order: int, schedule: List[date]):
        self.__order = order
        self.__schedule = schedule

    def get_order(self):
        return self.__order

    def get_schedule(self):
        return self.__schedule.copy()

    def set_order(self, order):
        self.__order = order
