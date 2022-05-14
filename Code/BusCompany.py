class BusCompany:
    def __init__(self, bus_lines, bus_list):  # def __init__(self, bus_lines: list[BusLine], bus_list: list[Bus]):
        self.__bus_lines = bus_lines
        self.__bus_list = bus_list

    def get_bus_lines(self):
        return self.__bus_lines

    def get_bus_list(self):
        return self.__bus_list
    # def get_number_of_buses(self):
    # todo
    # def get_total_capacity(self):
    # to do
