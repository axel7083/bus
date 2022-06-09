from .BusLine import BusLine

"""
@Author: Cyril Obrecht
"""

class LineNetwork:
    def __init__(self):
        """
        This class represent a network of lines. His goal is to store and index bus lines and retrieve exchange points
        between lines.
        """
        self.__index = {}
        self.__cache = {}

    def add_line(self, line: BusLine):
        """ Add a line to the network.
        :param line: The line to add
        """
        if self.__index[line.get_identifier()] is not None:
            raise ValueError(f"A line with the name {line.get_identifier()} already exist")
