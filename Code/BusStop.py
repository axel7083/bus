from random import randint
from typing import Tuple
from Point2D import Point2D
import Bus

""" Class that represents the bus Stops, it inherits from Point2D as we consider it as a point on the road.

@Author: jmaccou
"""
class BusStop(Point2D):

    __nbClient = 0

    def __init__(self, name: str, x: float, y: float):
        super().__init__(x, y)
        self.__name = name

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

    def bus_happens(bus : Bus):
        nbPassenger = bus.get_passenger()
        if nbPassenger > 0:
            bus.remove_passenger(randint(0,nbPassenger))