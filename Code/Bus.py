class Bus :
    __speed = 0
    __passenger = 0
    __maxCapacity = 0
    
    def __init__(self, newCapa) -> None:
        self.__maxCapacity = newCapa
    
    def __str__(self) -> str:
        state = 'Capacity = ' + str(self.getCapacity()) + '\nSpeed = ' + str(self.getSpeed()) + '\nPassengers = ' + str(self.getPassenger())
        return state

    def get_capacity(self) -> int:
        return self.__maxCapacity

    def get_passenger(self) -> int:
        return self.__passenger

    def get_speed(self) -> float:
        return self.__speed

    def set_speed(self, newSpeed) -> None:
        self.__speed = newSpeed

    def add_occupent(self, nbNewOccupents):
        if self.__passenger + nbNewOccupents <= self.__maxCapacity:
            self.__passenger += nbNewOccupents
        else:
            self.__passenger = self.__maxCapacity

    def remove_occupent(self, nbOccupentsLeaving):
        if self.__passenger - nbOccupentsLeaving >= 0:
            self.__passenger -= nbOccupentsLeaving
        else:
            self.__passenger = 0
        