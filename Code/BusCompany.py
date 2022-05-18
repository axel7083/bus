from Bus import Bus
from BusLine import BusLine
from typing import List

""" Class that instantiate a bus company that depends on 2 parameters the list of his buslines, and the list of his buses.

@Author: jmaccou 
"""
class BusCompany:
    def __init__(self, bus_lines: List[BusLine], bus_list: List[Bus]) -> None:
        """ Constructor of the bus company.
        
        :param bus_lines: the initial list of bus lines of the company.
        :param bus_list: the initial list of buses of the company.
        """
        self.__bus_lines = bus_lines
        self.__bus_list = bus_list

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
        totalCapa = 0
        for bus in self.__bus_list:
            totalCapa += bus.get_capacity()
        return totalCapa
