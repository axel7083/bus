import unittest

from Code.BusStop import BusStop
from Code.RunningBoard import RunningBoard
from Code.StopSchedule import StopSchedule

"""
Tests for the RunningBoard class
@Author: cobrecht
"""


class RunningBoardTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.stops = [
            BusStop("1", 0, 0, 0),
            BusStop("2", 0, 0, 0),
            BusStop("3", 0, 0, 0),
            BusStop("4", 0, 0, 0)
        ]
        cls.schedules = [
            StopSchedule(0, []),
            StopSchedule(1, []),
            StopSchedule(2, []),
            StopSchedule(3, [])
        ]

    def setUp(self) -> None:
        self.run = RunningBoard()

    def __iterate(self, expected):
        i = 0
        for _ in self.run:
            i += 1
        self.assertEqual(i, expected)

    def test_empty_iteration(self):
        self.__iterate(0)

    def test_one_elem_iteration(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.__iterate(1)

    def __add_all(self):
        for i in range(len(self.stops)):
            self.run.add_entry(self.stops[i], self.schedules[i])

    def test_multiple_elem_iteration(self):
        self.__add_all()
        self.__iterate(len(self.stops))

    @unittest.expectedFailure
    def test_invalid_add_schedule(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.run.add_entry(self.stops[1], self.schedules[0])

    @unittest.expectedFailure
    def test_invalid_add_bus(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.run.add_entry(self.stops[0], self.schedules[1])

    def test_get_with_one(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.assertEqual(self.run.get_schedule_by_order(self.schedules[0].get_order()), self.schedules[0])

    def test_get_with_one_by_stop(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.assertEqual(self.run.get_schedule_by_stop(self.stops[0]), self.schedules[0])

    def test_get_with_many(self):
        self.__add_all()

        for i in range(len(self.stops)):
            self.assertEqual(self.run.get_schedule_by_order(self.schedules[i].get_order()), self.schedules[i])

    @unittest.expectedFailure
    def test_get_without(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.run.get_schedule_by_order(self.schedules[1].get_order())

    def test_remove_one_one_schedule(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.run.remove_entry_by_schedule(self.schedules[0].get_order())
        self.__iterate(0)

    def test_remove_one_one_bus(self):
        self.run.add_entry(self.stops[0], self.schedules[0])
        self.run.remove_entry_by_bus_stop(self.stops[0])
        self.__iterate(0)

    def test_remove_many_one_schedule(self):
        self.__add_all()
        self.run.remove_entry_by_schedule(self.schedules[0].get_order())
        self.__iterate(len(self.stops) - 1)

    def test_remove_many_one_bus(self):
        self.__add_all()
        self.run.remove_entry_by_bus_stop(self.stops[0])
        self.__iterate(len(self.stops) - 1)

    def test_insert_first_no_shift(self):
        self.run.insert_entry(self.stops[0], self.schedules[0])
        self.__iterate(1)
        self.assertEqual(self.run.get_schedule_by_order(self.schedules[0].get_order()), self.schedules[0])

    def test_insert_last(self):
        self.__add_all()
        schedule = StopSchedule(
            max(*self.schedules, key=lambda s: s.get_order()).get_order() + 1,
            []
        )
        self.run.insert_entry(
            BusStop("shift", 0, 0, 0),
            schedule
        )
        self.__iterate(len(self.stops) + 1)
        self.assertEqual(self.run.get_schedule_by_order(schedule.get_order()), schedule)

    def test_insert_first_shift(self):
        self.__add_all()
        schedule = StopSchedule(0, [])
        self.run.insert_entry(
            BusStop("shift", 0, 0, 0),
            schedule
        )
        self.assertEqual(self.run.get_schedule_by_order(schedule.get_order()), schedule)

        self.schedules.sort(key=lambda s: s.get_order())

        last = None

        for schedule in self.schedules:
            if last is not None:
                self.assertGreater(schedule.get_order(), last.get_order())
            self.assertEqual(self.run.get_schedule_by_order(schedule.get_order()), schedule)

            last = schedule
