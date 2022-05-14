class Bus:
    def __init__(self, speed: int, occupant: int, max_capacity: int):
        self.__speed = speed
        self.__occupant = occupant
        self.__max_capacity = max_capacity

    def get_speed(self):
        return self.__speed

    def get_occupant(self):
        return self.__occupant

    def get_max_capacity(self):
        return self.__max_capacity
