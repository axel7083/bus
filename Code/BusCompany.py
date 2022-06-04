from .Bus import Bus
from .BusLine import BusLine
from typing import List

"""
Class that instantiate a bus company that depends on 2 parameters the list of his buslines, and the list of his buses.

@Author: jmaccou 
"""


class BusCompany:
    def __init__(self) -> None:
        """ Constructor of the bus company.
        """
        self.__bus_lines = []
        self.__bus_list = []

    def get_bus_lines(self) -> List[BusLine]:
        """
        :return: the list of all buslines of the company
        """
        return self.__bus_lines

    def get_bus_list(self) -> List[Bus]:
        """
        :return: the list of all the buses of the company
        """
        return self.__bus_list

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
