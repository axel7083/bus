from BusStop import BusStop
from StopSchedule import StopSchedule


class RunningBoard:
    def __init__(self):
        self.__timetable = {}
        self.__index_map = {}

    def add_entry(self, bus_stop: BusStop, schedule: StopSchedule):
        if bus_stop in self.__timetable:
            raise ValueError("This buss stop is already registered in this running board")
        elif schedule.get_order() in self.__index_map:
            raise ValueError(
                f"A bus stop with the scheduled order {schedule.get_order()}\
                 already exist int this running board"
            )
        else:
            self.__timetable[bus_stop] = schedule
