from random import randint
from typing import Tuple
from Point2D import Point2D
from Bus import Bus

""" Class that represents the bus Stops, it inherits from Point2D as we consider it as a point on the road.

@Author: jmaccou
"""
class BusStop(Point2D):

    __nbClient = 0

    def __init__(self, name: str, attractivity: int, x: float, y: float):
        super().__init__(x, y)
        self.__name = name
        self.__attractivity = attractivity

    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, BusStop):
            return self.get_pos() == __o.get_pos() and self.__name == __o.__name
        else:
            return False

    def get_name(self) -> str:
        return self.__name

    def get_nb_client(self) -> int:
        return self.__nbClient

    def get_pos(self) -> Tuple[float, float]:
        return self.get_x(), self.get_y()

    def add_clients(self, newClients : int) -> None:
        assert newClients >= 0
        self.__nbClient += newClients

    def bus_happens(self, bus : Bus):
        bus.remove_passenger(self.__weightedrandint(bus.get_passenger(), self.__attractivity))
        newPassengers = max(self.__nbClient, bus.get_capacity()-bus.get_passenger())
        bus.add_passenger(newPassengers)
        self.__nbClient -= newPassengers

    @staticmethod
    def __weightedrandint(max: int, weight : int) -> int:
        if weight == 0:
            return max
        elif weight == 1 or weight == 3:
            sum =0
            for _ in range(int(1.6 * max)):
                sum+=randint(0,1)
            if sum > max:
                sum = 2 * max - sum 
            if weight == 1:
                return sum
            else:
                return max - sum
        elif weight == 2:
            return randint(0, max)