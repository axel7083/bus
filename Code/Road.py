import Line


class Road:
    def __init__(self, position: Line, traffic: float, speedlimit: int):
        self.__position = position
        self.__traffic = traffic
        self.__speedlimit = speedlimit

    def get_position(self) -> Line:
        return self.__position

    def get_traffic(self) -> float:
        return self.__traffic

    def get_speed_limit(self) -> int:
        return self.__speedlimit
