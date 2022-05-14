class Point2D:
    def __init__(self, x: float, y: float):
        self.__x = x
        self.__y = y

    def get_x(self):
        return self.__x

    def get_y(self):
        return self.__y


class Line:
    def __init__(self, begin: Point2D, end: Point2D):
        self.__begin_point = begin
        self.__ending_point = end

    def get_begin_point(self):
        return self.__begin_point

    def get_end_point(self):
        return self.__ending_point


class InterestPoint:
    def __init__(self, name: str, timetable, coordinates: Point2D):
        self.__name = name
        self.__timetable = timetable
        self.__coordinates = coordinates

    def get_name(self):
        return self.__name

    def get_timetable(self):
        return self.__timetable

    def get_coordinates(self):
        return self.__coordinates


class Circle:
    def __init__(self, point: Point2D, radius: float):
        self.__center = point
        self.__radius = radius

    def get_center(self):
        return self.__center

    def get_radius(self):
        return self.__radius


class Bus:
    def __init__(self, speed: int, occupant: int, maxcapacity: int):
        self.__speed = speed
        self.__occupant = occupant
        self.__max_capacity = maxcapacity

    def get_speed(self):
        return self.__speed

    def get_occupant(self):
        return self.__occupant

    def get_max_capacity(self):
        return self.__max_capacity


class BusStop:
    def __init__(self, name: str, nbClient: int):
        self.__name = name
        self.__nbClient = nbClient

    def getName(self):
        return self.__name

    def getNbClient(self):
        return self.__nbClient


class RunningBoard:
    def __init__(self, timetable):
        self.__timetable = timetable

    def get_timetable(self):
        return self.__timetable


class BusLine:
    def __init__(self, name: str, path, board: RunningBoard):
        self.__name = name
        self.__path = path
        self.__runningBoard = board

    def get_name(self):
        return self.__name

    def get_path(self):
        return self.__path

    def getRunningBoard(self):
        return self.__runningBoard


class Road:
    def __init__(self, position: Line, traffic: float, speedlimit: int):
        self.__position = position
        self.__traffic = traffic
        self.__speedlimit = speedlimit

    def get_position(self):
        return self.__position

    def get_traffic(self):
        return self.__traffic

    def get_speed_limit(self):
        return self.__speedlimit


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


class StopSchedule:

    def __init__(self, order: int, schedule):
        self.__order = order
        self.__schedule = schedule

    def get_order(self):
        return self.__order

    def get_schedule(self):
        return self.__schedule


def print_hi(name):
    # bus = BusStop("Aurillac", 12) #ok
    # print(BusStop.getName(bus)) #ok

    point = Point2D(23, 12)
    # print(Point2D.get_x(point))
    # print(Point2D.get_y(point))

    l_pointx = Point2D(23, 12)
    l_pointy = Point2D(30, 15)
    l = Line(l_pointx, l_pointy)
    print(Line.get_begin_point(l).get_x())  # ok
    print(Line.get_end_point(l).get_x())  # ok
    print(Line.get_begin_point(l).get_y())  # ok
    print(Line.get_end_point(l).get_y())  # ok

    c_point = Point2D(25, 12)
    c = Circle(c_point, 100)
    # print(Circle.get_center(c).get_x())
    # print(Circle.get_center(c).get_y())
    # print(Circle.get_radius(c))

    road = Road(l, 123.5, 50)
    print(Road.get_position(road))
    # print(Road.get_traffic(road))#ok
    # print(Road.get_speed_limit(road))#ok

    # myBus = Bus(35,120,140)#ok
    # print(Bus.get_speed(myBus))#ok
    # print(Bus.get_occupant(myBus))#ok
    # print(Bus.get_max_capacity(myBus))#ok
    interest_point = Point2D(123, 142)
    interest = InterestPoint("Musée", ["Lundi - Vendredi", "8h00-12h00", "14h00-18h00"], interest_point)
    print(InterestPoint.get_name(interest))
    # print(InterestPoint.get_coordinates(interest).get_x())
    # print(InterestPoint.get_coordinates(interest).get_y())
    # print(InterestPoint.get_timetable(interest))


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
