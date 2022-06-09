""" This class implements the class Bus. We consider a Bus as 3 parameters, his maximum capacity, his number of passengers and his speed.
@Author: Jean Maccou
"""


class Bus:
    """ The two parameters speed and passenger are set as private and are base setted as 0 because there is no reason to think that a bus is created with speed
    or with passengers.
    """
    __speed = 0.
    __passenger = 0

    def __init__(self, new_capa: int) -> None:
        """ Constructor of the bus.

        :param new_capa: the capacity of the bus we want to create.
        """
        self.__maxCapacity = new_capa

    def __str__(self) -> str:
        """ Create a way to transform the state of the bus into a string.
        :return: the state of the bus in a string.
        """
        state = 'Capacity = ' + str(self.get_capacity()) + '\nSpeed = ' + str(
            self.get_speed()) + '\nPassengers = ' + str(self.get_passenger())
        return state

    def get_capacity(self) -> int:
        """
        :return: the maximum capacity of the bus.
        """
        return self.__maxCapacity

    def get_passenger(self) -> int:
        """
        :return: the number of passengers in the bus when the method is called.
        """
        return self.__passenger

    def get_speed(self) -> float:
        """
        :return: the speed of the bus when the method is called.
        """
        return self.__speed

    def set_speed(self, new_speed: float) -> None:
        """ Set a new speed of the bus. It's important as the bus speed varies function of the road it's running on.

        :param new_speed: the new speed of the bus.
        """
        self.__speed = new_speed

    def add_passenger(self, nb_new_passengers: int) -> None:
        """ Function that represent the number of passengers that comes in the bus at a bus stop.

        :param nb_new_passengers: the number of passengers to add to the existing passengers in the bus.
        """
        self.__passenger += nb_new_passengers
        if self.__passenger + nb_new_passengers >= self.__maxCapacity:
            self.__passenger = self.__maxCapacity

    def remove_passenger(self, nb_passengers_leaving: int) -> None:
        """ Function that represent the number of passengers that are leaving the bus at a bus stop.

        :param nb_passengers_leaving: the number of passengers that are leaving the bus.
        """
        self.__passenger -= nb_passengers_leaving
        if self.__passenger <= 0:
            self.__passenger = 0