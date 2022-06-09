from .BusStop import BusStop
from .StopSchedule import StopSchedule

"""
@Author: Cyril Obrecht
"""


class RunningBoard:
    def __init__(self):
        self.__timetable = {}
        self.__index_map = {}

    def add_entry(self, bus_stop: BusStop, schedule: StopSchedule) -> None:
        """
        Adds a new entry to the running board.

        :param bus_stop: The bus stop to add
        :param schedule: The associated schedule to add
        """
        if bus_stop in self.__timetable:
            raise ValueError("This buss stop is already registered in this running board")
        elif schedule.get_order() in self.__index_map:
            raise ValueError(
                f"A bus stop with the scheduled order {schedule.get_order()}" +
                "already exist int this running board"
            )
        else:
            self.__timetable[bus_stop] = schedule
            self.__index_map[schedule.get_order()] = bus_stop

    def _shift(self, start: int) -> None:
        """
        Shifts all the schedules order after the given start order until either the end of the list or a gap in orders of 2 or more.
        :param start: The start order to shift from
        """
        indexes = [x for x in self.__index_map]
        indexes.sort()
        index = indexes.index(start)
        to_remap = []
        while index + 1 < len(indexes) and indexes[index] + 1 >= indexes[index + 1]:
            to_remap.append(index)
            self.get_schedule_by_order(index).set_order(indexes[index] + 1)
            index += 1

        to_remap.append(index)
        self.get_schedule_by_order(index).set_order(indexes[index] + 1)
        to_remap.reverse()

        for i in to_remap:
            self.__index_map[indexes[i] + 1] = self.__index_map[indexes[i]]

        del self.__index_map[start]

    def insert_entry(self, bus_stop: BusStop, schedule: StopSchedule) -> None:
        """
        Inserts a new entry in the running board. If the bus stop is already in the running board, then all necessary \
        schedules order are shifted up.
        :param bus_stop:
        :param schedule:
        :return:
        """
        if bus_stop in self.__timetable:
            raise ValueError("This buss stop is already registered in this running board")
        elif schedule.get_order() in self.__index_map:
            self._shift(schedule.get_order())
        self.add_entry(bus_stop, schedule)

    def get_schedule_by_order(self, schedule_order: int) -> StopSchedule:
        """
        Returns the schedule associated with the given order.
        :param schedule_order: The order of the schedule to return
        :return: the schedule associated with the given order
        """
        if schedule_order not in self.__index_map:
            raise ValueError(f"There is no schedule with order {schedule_order} registered in this running board")
        return self.__timetable[self.__index_map[schedule_order]]

    def get_schedule_by_stop(self, stop: BusStop):
        return self.__timetable[stop]

    def remove_entry_by_schedule(self, schedule_order: int) -> None:
        """
        Removes an entry from the running board by its schedule order.

        :param schedule_order: The order of the schedule to remove
        """
        if schedule_order not in self.__index_map:
            raise ValueError(f"Unable to remove entry related to schedule with order {schedule_order}\
             : no schedule with that order found")
        else:
            del self.__timetable[self.__index_map[schedule_order]]
            del self.__index_map[schedule_order]

    def remove_entry_by_bus_stop(self, bus_stop: BusStop) -> None:
        if bus_stop not in self.__timetable:
            raise ValueError(f"Unable to remove entry related to bus stop {str(bus_stop)}\
             : this bus stop is not registered here")
        else:
            del self.__index_map[self.__timetable[bus_stop].get_order()]
            del self.__timetable[bus_stop]

    def __str__(self) -> str:
        val = ""
        for stop in self.__timetable:
            val += stop.get_name() + ":" + str(self.__timetable[stop].get_order()) + "\n"
        return val.strip()

    def __iter__(self):
        return RunningBoard.__RunningBoardIterator(self.__timetable, self.__index_map)

    class __RunningBoardIterator:
        def __init__(self, timetable, index_map):
            self.__timetable = timetable
            self.__index_map = index_map
            self.__indexes = [x for x in self.__index_map.keys()]
            self.__indexes.sort()
            self.__index = 0

        def __next__(self):
            if self.__index >= len(self.__indexes):
                raise StopIteration
            else:
                self.__index += 1
                return (
                    self.__timetable[self.__index_map[self.__indexes[self.__index - 1]]],
                    self.__index_map[self.__indexes[self.__index - 1]]
                )
