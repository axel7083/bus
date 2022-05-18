import Point2D


class Line:
    def __init__(self, begin: Point2D, end: Point2D):
        self.__begin_point = begin
        self.__ending_point = end

    def get_begin_point(self) -> Point2D:
        return self.__begin_point

    def get_end_point(self) -> Point2D:
        return self.__ending_point
