from typing import List

from Road import Road
from RunningBoard import RunningBoard


class BusLine:
    def __init__(self, identifier: str, path: List[Road], board: RunningBoard = None):
        """ Define a bus line

        :param identifier: The identifier of the bus line
        :param path: The path that the buses will follow. The path must loop.
        :param board: The Running board of the line
        """
        self.__identifier = identifier
        self.__path = path
        if self.__path[0].get_position().get_begin_point() != self.__path[-1].get_position().get_end_point():
            raise ValueError(
                f"The path must loop but the end is at {str(self.__path[-1].get_position().get_end_point())}\
                while the start is at {str(self.__path[0].get_position().get_begin_point())}"
            )
        if board is None:
            self.__runningBoard = RunningBoard()
        self.__runningBoard = board

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
        :return: The running bord of the bus line
        """
        return self.__runningBoard

    def get_punctuality(self):
        """
        :return:
        """
        pass
