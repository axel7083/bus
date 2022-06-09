from .Point2D import Point2D
from .Bus import Bus
from random import randint


class BusStop(Point2D):
    """
    __nbClient is always initialized at 0 as there is no reason to think that it can be some clients in the BusStop at it's creation.
    """
    __nbClient = 0

    def __init__(self, name: str, attractivity: int, x: float, y: float):
        """ The constructors takes 4 parameters
        :param name: the name of the bus stop
        :param attractivity: the attractivity of the bus stop it can have 4 values [0 : Terminus, 1 : Very attractive, 2: Neutral, 3 : Not attractive]
        :param x: the parameter inherited from Point2D, the x position of the bus stop on the map
        :param y: the parameter inherited from Point2D, the y position of the bus stop on the map
        """
        super().__init__(x, y)
        self.__name = name
        self.__attractivity = attractivity

    def __hash__(self):
        return hash(f"{self.get_pos()}:{self.get_name()}")

    def get_name(self) -> str:
        """ Getter on the parameter __name
        :return: the name of the bus stop
        """
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_nb_client(self) -> int:
        """ Getter on the parameter __nbClients
        :return: the number of clients waiting on the bus stop
        """
        return self.__nbClient

    def set_attractivity(self, newAttractivity: int) -> None:
        """ Setter on the parameter __attractivity
        :param newAttractivity: the new attractivity of the bus stop
        """
        self.__attractivity = newAttractivity

    def add_clients(self, newClients: int) -> None:
        """ Add clients on the bus stop
        :param newClients: number of clients to add to the bus stop
        """
        assert newClients >= 0
        self.__nbClient += newClients

    def bus_happens(self, bus: Bus) -> int:
        """ Function that handle when a bus arrives on a bus stop
        This function remove passengers of the bus based on a random int that is weighted function of the attractivity of the bus stop
        :param bus: the instance of the bus we have to handle with
        """
        removed_passenger_count =(self.__weightedrandint(bus.get_passenger(), self.__attractivity))
        bus.remove_passenger(removed_passenger_count)
        print(" - Descente: il reste " + str(bus.get_passenger()) + " personne(s) à bord")
        newPassengers = max(self.__nbClient, bus.get_capacity() - bus.get_passenger())
        bus.add_passenger(newPassengers)
        print(" - Montée : il reste " + str(bus.get_passenger()) + " personne(s) à bord")
        self.__nbClient = self.__nbClient - newPassengers
        return removed_passenger_count

    @staticmethod
    def __weightedrandint(max: int, weight: int) -> int:
        """ This function is a static function that returns a weighted randint based on the weight we gave to it to simulate the person exiting the bus when it arrives.
        There is 4 cases with this function :
            - weight = 0 : it always return the max, everybody is supposed to exit the bus at the terminus
            - weight = 1 : we sum a certain number of randint to simulate a normal law, and we flip every result that is bigger than the maximum
            - weight = 2 : we return a randint
            - weight = 3 : we do the same as for weight = 1 but we substract the result to the max in the goal to invert the result
        :return: a weighted random int useful for the function bus_happens
        """
        if weight == 0:
            return max
        elif weight == 1 or weight == 3:
            sum = 0
            for _ in range(int(1.6 * max)):
                sum += randint(0, 1)
            if sum > max:
                sum = 2 * max - sum
            if weight == 1:
                return sum
            else:
                return max - sum
        elif weight == 2:
            return randint(0, max)
