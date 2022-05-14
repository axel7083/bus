class BusStop:
    def __init__(self, name: str, nb_client: int):
        self.__name = name
        self.__nbClient = nb_client

    def get_name(self):
        return self.__name

    def get_nb_client(self):
        return self.__nbClient
