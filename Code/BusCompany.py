from .Bus import Bus
from .BusLine import BusLine
from typing import List

""" Class that instantiate a bus company that depends on 2 parameters the list of his buslines, and the list of his buses.

@Author: Jean Maccou 
"""


class BusCompany:
    def __init__(self, buslines : List[BusLine] = None, buslist : List[Bus] = None) -> None:
        """ Constructor of the bus company.
        We create it by copying values of the list bus lines in order to not permit to anyone to modify the lists after initialisation.

        :param buslines: the list of bus lines of the company.
        :param buslist: the list of buses of the company.
        """
        if buslines is None:
            self.__bus_lines : List[BusLine] = []
            self.__bus_list : List[Bus] = []
        else:
            self.__bus_lines = buslines.copy()
            self.__bus_list = buslist.copy()

    def get_bus_lines(self) -> List[BusLine]:
        """
        :return: a copy of the list of all buslines of the company
        """
        return self.__bus_lines.copy()

    def get_bus_list(self) -> List[Bus]:
        """
        :return: a copy of the list of all the buses of the company
        """
        return self.__bus_list.copy()

    def get_number_of_buses(self) -> int:
        """
        :return: the number of buses of the company
        """
        return len(self.__bus_list)

    def get_total_capacity(self) -> int:
        """
        :return: the sum of maximum capacity of all the buses of the company
        """
        total_capa = 0
        for bus in self.__bus_list:
            total_capa += bus.get_capacity()
        return total_capa

    def add_bus_line(self, bus_line : BusLine) -> None:
        """
        :param bus_line: the bus line we want to add to the company
        """
        self.__bus_lines.append(bus_line)

    def add_bus(self, bus : Bus) -> None:
        """
        :param bus: the bus we want to add to the company
        """
        self.__bus_list.append(bus)

    def remove_bus_line(self, bus_line : BusLine) -> None:
        """
        :param bus_line: the bus line we want to remove from the company
        """
        self.__bus_lines.remove(bus_line)

    def remove_bus(self, bus : Bus) -> None:
        """
        :param bus: the bus we want to remove from the company
        """
        self.__bus_list.remove(bus)
