from Bus import Bus
from BusLine import BusLine
from typing import List


class BusCompany:
    def __init__(self, bus_lines: List[BusLine], bus_list: List[Bus]) -> None:  # def __init__(self, bus_lines: list[BusLine], bus_list: list[Bus]):
        self.__bus_lines = bus_lines
        self.__bus_list = bus_list

    def get_bus_lines(self) -> List[BusLine]:
        return self.__bus_lines

    def get_bus_list(self) -> List[Bus]:
        return self.__bus_list
    
    def get_number_of_buses(self) -> int:
        return self.__bus_list.len()
    
    def get_total_capacity(self) -> int:
        totalCapa = 0
        for bus in self.__bus_list:
            totalCapa += bus.get_capacity()
        return totalCapa
