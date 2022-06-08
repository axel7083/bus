import math
from math import *
from random import randrange
from models.Point2D import Point2D


def calculate_time(p1: Point2D, p2: Point2D) -> float:
    """
        :param p1: the stop n°n
        :param p2: the stop n°n+1
        :return: the time that it took to the bus to go from the point p1 to the point p2
    """
    R = 6373.0  # radius of the earth
    lat1 = math.radians(p1.get_x())  # the latitude of point 1
    lon1 = math.radians(p1.get_y())  # the longitude of point 1
    lat2 = math.radians(p2.get_x())  # the latitude of point 2
    lon2 = math.radians(p2.get_y())  # the longitude of point 2
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    # Haversine formula
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    time_needed = round((distance / 30) * 60 * 100) / 100
    print("For the distance : " + str(distance) + " km, the bus take : " + str(time_needed) + " minutes")
    return time_needed



def simulateLine(line):
    """
            We take from the JSON file, the id of the line, its name, its schedule
            """
    id = line['id_line']
    name = line['name']
    print("------------------------------------------------------------------------------")
    resultBusStop = []
    for r in range(len(line['horraire'])):
        if r != len(line['horraire']) - 1:

            if r == 0:  # If this is the first stop
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                p2 = Point2D(line['horraire'][r + 1]['lat'],
                             line['horraire'][r + 1]['long'])
                print("#----------------------------------------------#")
                resultsSchedules = []
                resultsSchedules.append(line['horraire'][r]['name'])
                resultsSchedules.append(line['horraire'][r]['hours'])
                resultsSchedules.append(line['horraire'][r]['hours'])
                resultsSchedules.append(line['horraire'][r]['hours'])
                resultsSchedules.append(line['horraire'][r]['hours'])
                resultsSchedules.append(1)
                resultBusStop.append(resultsSchedules)

                """
                We get the name of the bus line, the hours of arrival expected
                """
                resultsSchedules = []
                resultsSchedules.append(line['horraire'][r + 1]['name'])  # name
                resultsSchedules.append(line['horraire'][r + 1]['hours'])  # expected hour

                arrivedAt = line['horraire'][r + 1]['hours']

                """
                We get the minutes and the hours of the expected hours, the time to go from the stop to the other one:
                     - the slowest possibilities : It is assumed that the bus took 1.30 times the expected time
                     - the average possibilities : It is assumed that we test it 500 times and the bus can take 1 to 1.30 times the expected time
                """
                hoursExpected = 0
                if arrivedAt[0] == '0':
                    hoursExpected = int(arrivedAt[1])
                else:
                    hoursExpected = int(arrivedAt[0] + arrivedAt[1])

                minutesExpected = 0
                if arrivedAt[3] == '0':
                    minutesExpected = int(arrivedAt[4])
                else:
                    minutesExpected = int(arrivedAt[3] + arrivedAt[4])



                time_to_drive = calculate_time(p1, p2)
                slowest = ceil(time_to_drive * 1.30)
                average = 0
                for n in range(0, 500):
                    average = average + time_to_drive * (1 + randrange(30) / 100)
                average = ceil(average / 500)
                print("Temps min : " + str(time_to_drive) + " Time avg " + str(average) + " Time max : " + str(
                    slowest))
                time_to_drive = ceil(time_to_drive)

                """
                 if when we add the time of the journey to the time when the bus arrived to the last stop, the total is superior to 60:
                     - we add an hours and do the difference for the minutes
                 Else :
                     - we only add the minutes to the others
                """
                if minutesExpected + time_to_drive > 60:
                    earlier_minute = minutesExpected + time_to_drive - 60
                    earlier_hours = hoursExpected + 1
                    resultsSchedules.append(str(earlier_hours) + ":" + str(earlier_minute))  # earlier
                    prev_value = str(earlier_hours) + ":" + str(earlier_minute)
                    latest_minute = minutesExpected + slowest - 60
                    resultsSchedules.append(str(earlier_hours) + ":" + str(latest_minute))  # slowest
                    average_minute = minutesExpected + average - 60
                    resultsSchedules.append(str(earlier_hours) + ":" + str(average_minute))  # average
                else:
                    earlier_minute = minutesExpected + time_to_drive
                    resultsSchedules.append(str(hoursExpected) + ":" + str(earlier_minute))  # earlier
                    prev_value = str(hoursExpected) + ":" + str(earlier_minute)
                    latest_minute = minutesExpected + slowest
                    resultsSchedules.append(str(hoursExpected) + ":" + str(latest_minute))  # slowest
                    average_minute = minutesExpected + average
                    resultsSchedules.append(str(hoursExpected) + ":" + str(average_minute))  # average
                print("heure de départ : " + arrivedAt)
                print("Le bus est arrivée à " + resultsSchedules[2])
                resultsSchedules.append(1)

            # if numer of stop >1

            else:
                """
                The process is almost the same as below. We juste have the time of arrival of the previous bus stop.
                """
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                p2 = Point2D(line['horraire'][r + 1]['lat'],
                             line['horraire'][r + 1]['long'])
                print("#----------------------------------------------#")
                resultsSchedules = []
                resultsSchedules.append(line['horraire'][r + 1]['name'])  # name
                resultsSchedules.append(line['horraire'][r + 1]['hours'])  # expected hour

                hoursExpected = 0
                if prev_value[0] == '0':
                    hoursExpected = int(prev_value[1])
                else:
                    hoursExpected = int(prev_value[0] + prev_value[1])

                minutesExpected = 0
                if prev_value[3] == '0':
                    minutesExpected = int(prev_value[4])
                else:
                    minutesExpected = int(prev_value[3] + prev_value[4])

                time_to_drive = calculate_time(p1, p2)
                slowest = ceil(time_to_drive * 1.30)
                average = 0
                for n in range(0, 500):
                    average = average + time_to_drive * (1 + randrange(30) / 100)
                average = ceil(average / 500)
                print("Time min : " + str(time_to_drive) + " Time avg " + str(average) + " Time max : " + str(
                    slowest))
                time_to_drive = ceil(time_to_drive)

                if minutesExpected + time_to_drive > 60:
                    earlier_minute = minutesExpected + ceil(time_to_drive) - 60
                    earlier_hours = hoursExpected + 1
                    resultsSchedules.append(str(earlier_hours) + ":" + str(earlier_minute))  # earlier
                    latest_minute = minutesExpected + slowest - 60
                    resultsSchedules.append(str(earlier_hours) + ":" + str(latest_minute))  # slowest
                    average_minute = minutesExpected + average - 60
                    resultsSchedules.append(str(earlier_hours) + ":" + str(average_minute))  # average
                    prev_value = str(earlier_hours) + ":" + str(earlier_minute)
                else:
                    earlier_minute = minutesExpected + ceil(time_to_drive)
                    resultsSchedules.append(str(hoursExpected) + ":" + str(earlier_minute))  # earlier
                    prev_value = str(hoursExpected) + ":" + str(earlier_minute)
                    latest_minute = minutesExpected + slowest
                    resultsSchedules.append(str(hoursExpected) + ":" + str(latest_minute))  # slowest
                    average_minute = minutesExpected + average
                    resultsSchedules.append(str(hoursExpected) + ":" + str(average_minute))  # average
                print("This bus arrived at " + resultsSchedules[2])
                resultsSchedules.append(1)  # for the number of delay : default value
            resultBusStop.append(resultsSchedules)
    finalDict = {"id_line": id, "name": name, "horraire": resultBusStop}
    return finalDict


def magic(list_of_point):

    """
        resultBusStop : the result of the simulation for a bus stop arrival
        resultsSchedules : The table that contains the result of the simulation for one line.
        linesResults : the table that contains all the simulation results from all the bus line and stop
        prev_value : used to calculate the time of arrival with all the previous delay

    """
    linesResults = []
    prev_value = 0
    """
    We look at the whole JSON in order to simulate every bus line.
    """
    for i in range(len(list_of_point)):
        linesResults.append(simulateLine(list_of_point[i]))


    return linesResults