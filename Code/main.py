from Line import Line
from Circle import Circle
from InterestPoint import InterestPoint
from Point2D import Point2D
from Road import Road


def print_hi(name):
    # bus = BusStop("Aurillac", 12) #ok
    # print(BusStop.getName(bus)) #ok

    point = Point2D(23, 12)
    # print(Point2D.get_x(point))
    # print(Point2D.get_y(point))

    l_point_x = Point2D(23, 12)
    l_point_y = Point2D(30, 15)
    line = Line(l_point_x, l_point_y)
    print(Line.get_begin_point(line).get_x())  # ok
    print(Line.get_end_point(line).get_x())  # ok
    print(Line.get_begin_point(line).get_y())  # ok
    print(Line.get_end_point(line).get_y())  # ok

    c_point = Point2D(25, 12)
    c = Circle(c_point, 100)
    # print(Circle.get_center(c).get_x())
    # print(Circle.get_center(c).get_y())
    # print(Circle.get_radius(c))

    road = Road(line, 123.5, 50)
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
