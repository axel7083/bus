class Point2D:
    """
    This class represent a point in a 2 dimentional space. It's define by two values. It's position on the x-axis and its position on the y-axis.
    """
    def __init__(self, x: float, y: float):
        """ Constructor for the class Point2D.
        :param x: the position of the point on the x-axis.
        :param y: the position of the point on the y-axis.
        """
        self.__x = x
        self.__y = y

    def get_x(self) -> float:
        """
        :return: the position of the point on the x-axis
        """
        return self.__x

    def get_y(self) -> float:
        """
        :return: the position of the point on the y-axis
        """
        return self.__y

