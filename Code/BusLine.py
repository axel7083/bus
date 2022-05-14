from main import RunningBoard


class BusLine:
    def __init__(self, name: str, path, board: RunningBoard):
        self.__name = name
        self.__path = path
        self.__runningBoard = board

    def get_name(self):
        return self.__name

    def get_path(self):
        return self.__path

    def get_running_board(self):
        return self.__runningBoard
