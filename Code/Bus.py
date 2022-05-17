from asyncio import wait


class Bus :
    __speed = 0
    __passenger = 0
    __maxCapacity = 0
    
    def __init__(self, newCapa) -> None:
        self.__maxCapacity = newCapa

    def printState(self) -> None:
        print(self.getCapacity(), self.getPassenger(), self.getSpeed())

    def __str__(self) -> str:
        state = 'Capacity = ' + str(self.getCapacity()) + '\nSpeed = ' + str(self.getSpeed()) + '\nPassengers = ' + str(self.getPassenger())
        return state

    def getCapacity(self) -> int:
        return self.__maxCapacity

    def getPassenger(self) -> int:
        return self.__passenger

    def getSpeed(self) -> float:
        return self.__speed

    def setSpeed(self, newSpeed) -> None:
        self.__speed = newSpeed

    def addOccupent(self, nbNewOccupents):
        if self.__passenger + nbNewOccupents <= self.__maxCapacity:
            self.__passenger += nbNewOccupents
        else:
            self.__passenger = self.__maxCapacity

    def removeOccupent(self, nbOccupentsLeaving):
        if self.__passenger - nbOccupentsLeaving >= 0:
            self.__passenger -= nbOccupentsLeaving
        else:
            self.__passenger = 0

    def busStop(self, stop):
        wait(10)
        