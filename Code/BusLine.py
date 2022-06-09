from typing import List

from .Road import Road
from .RunningBoard import RunningBoard

""" This class implements bus lines. We consider a bus line as 3 parameters, it's identifier, his path and his RunningBoard.

@Author: Cyril Obrecht
"""


class BusLine:
    def __init__(self, identifier: str, path: List[Road], board: RunningBoard = None):
        """ Define a bus line

        :param identifier: The identifier of the bus line
        :param path: The path that the buses will follow. The path must loop.
        :param board: The Running board of the line
        """
        self.__identifier = identifier
        if path is None:
            raise ValueError("The path of the bus line cannot be None")
        self.__path = path.copy()
        
        if self.__path[0].get_position().get_begin_point() != self.__path[-1].get_position().get_end_point():
            raise ValueError(
                f"The path must loop but the end is at {str(self.__path[-1].get_position().get_end_point())}\
                while the start is at {str(self.__path[0].get_position().get_begin_point())}"
            )
        if board is None:
            self.__runningBoard = RunningBoard()
        self.__runningBoard = board

    def __eq__(self, other):
        if isinstance(other, BusLine):
            if other.get_identifier() == self.get_identifier():
                return True
        return False

    def get_identifier(self) -> str:
        """
        :return: The name of the bus line
        """
        return self.__identifier

    def get_path(self) -> List[Road]:
        """
        :return: A copy of the path that buses follow.
        """
        return self.__path.copy()

    def get_running_board(self) -> RunningBoard:
        """
        :return: The running board of the bus line
        """
        return self.__runningBoard

    def get_punctuality(self):
        # TODO
        """
        :return:
        """
        pass
