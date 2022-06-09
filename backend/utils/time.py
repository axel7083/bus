import math
from math import *
from random import randrange

from models.Bus import Bus
from models.BusStop import BusStop
from models.Point2D import Point2D


def calculate_time(p1: Point2D, p2: Point2D):
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
    print("For the distance : " + str("{0:.2f}".format(distance)) + " km, the bus take : " + str(time_needed)
          + " minutes")
    return time_needed


"""
Function used for each stop to avoid the repetition of code.
"""


def add_name_expected_hours_to_tab(horraire, r):
    resultsSchedules = []
    resultsSchedules.append(horraire[r + 1]['name'])  # name
    resultsSchedules.append(horraire[r + 1]['hours'])  # expected hour
    return resultsSchedules


"""
    Function used to calculate the time that a bus will take to go from a point to another point
     We calculated the earliest arrival, latest arrival and the average arrival hour
     P1 : The stop from where the bus is starting
     P2 : The stop where the bus is leading
"""


def driving_time(p1, p2):
    time_to_drive = calculate_time(p1, p2)
    slowest = ceil(time_to_drive * 1.30)
    average = 0
    for n in range(0, 500):
        average = average + time_to_drive * (1 + randrange(30) / 100)
    average = ceil(average / 500)
    time_to_drive = ceil(time_to_drive)
    return time_to_drive, slowest, average


"""
This function is used to ensure that the hours that will be printed make sense:
- we have only 60 minutes in an hour 
- we only have 24 hours per day
It return the string version of an hour following this pattern : hh:mm
"""


def calculate_hours(h1, m1, time):
    if m1 + time > 60:
        m1 = m1 + time - 60
        h1 = h1 + 1
    else:
        m1 = m1 + time
    if h1 > 23:
        h1 = 0
    if m1 < 10:
        m1 = "0" + str(m1)
    if h1 < 10:
        h1 = "0" + str(h1)
    return str(h1) + ":" + str(m1)


"""
This function is used to obtain all the hours that are needed in the simulation result:
 - the earliest arrival
 - the latest arrival
 - the average arrival
 """


def addition_lower_than_sixty(resultsSchedules, minutesExpected, hoursExpected, time_to_drive, slowest, average):
    resultsSchedules.append(calculate_hours(hoursExpected, minutesExpected, time_to_drive))
    prev_value = calculate_hours(hoursExpected, minutesExpected, time_to_drive)
    latest_minute = minutesExpected + slowest
    resultsSchedules.append(calculate_hours(hoursExpected, latest_minute, time_to_drive))
    average_minute = minutesExpected + average
    resultsSchedules.append(calculate_hours(hoursExpected, average_minute, time_to_drive))
    return resultsSchedules, prev_value



def simulateLine(line):
    print("simulateLine", line)
    """
    We take from the JSON file, the id of the line, its name, its schedule
    """
    id = line['id_line']
    name = line['name']
    r = 0
    resultBusStop = []
    bus = Bus(90)  # CHANGER POUR UNE VRAI CAPA
    bus.set_speed(30)
    for r in range(len(line['horraire'])):
        if r != len(line['horraire']) - 1:

            if r == 0:  # If this is the first stop
                print("")
                print("#----------------------------------------------#")
                print("Now line : " + name)
                print("#----------------------------------------------#")
                print("")
                """
                The first stop is special, we assume that the bus is always on time for it starting loop
                 and there is no delay, so we save the data as it is given
                """
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                busStop = BusStop(line['horraire'][r]['name'], 3, p1.get_x(), p1.get_y())
                busStop.add_clients(randrange(1, bus.get_capacity()))
                bus.add_passenger(busStop.get_nb_client())
                print("Debut ligne : arret [" + busStop.get_name() + "], il y a " + str(
                    busStop.get_nb_client()) + " personnes qui prennent le bus")
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
                resultsSchedules = add_name_expected_hours_to_tab(line['horraire'], r)
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                p2 = Point2D(line['horraire'][r + 1]['lat'],
                             line['horraire'][r + 1]['long'])
                arrivedAt = line['horraire'][r]['hours']
                """
                We get the minutes and the hours of the expected hours, the time to go from the stop to the other one:
                     - the slowest possibilities : It is assumed that the bus took 1.30 times the expected time
                     - the average possibilities : It is assumed that we test it 500 times and the bus can take 1 to 1.30 times the expected time
                """
                hoursExpected = int(arrivedAt[0] + arrivedAt[1])
                minutesExpected = int(arrivedAt[3] + arrivedAt[4])
                time_to_drive, slowest, average = driving_time(p1, p2)
                """
                 if when we add the time of the journey to the time when the bus arrived to the last stop, the total is superior to 60:
                     - we add an hours and do the difference for the minutes
                 Else :
                     - we only add the minutes to the others
                """
                resultsSchedules, prev_value = addition_lower_than_sixty(resultsSchedules, minutesExpected,
                                                                         hoursExpected, time_to_drive, slowest, average)
                busStop = BusStop(line['horraire'][r + 1]['name'],
                                  line['horraire'][r + 1]['attractiveness'], p2.get_x(), p2.get_y())
                print("Arret [" + busStop.get_name() + "] - " + resultsSchedules[2])
                print("personne à bord avant " + str(bus.get_passenger()))
                nb = busStop.bus_happens(bus)
                print("personne à bord après " + str(bus.get_passenger()))

                resultsSchedules.append(1)
            # if number of stop >1
            elif r == len(line['horraire']) - 2:
                """
                We calculate the last journey of the bus in the same way than before
                The only thing that change is that we don't let people enter in the bus at the last stop since it is the terminus
                """
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                p2 = Point2D(line['horraire'][r + 1]['lat'],
                             line['horraire'][r + 1]['long'])
                print("#----------------------------------------------#")
                resultsSchedules = add_name_expected_hours_to_tab(line['horraire'], r)
                hoursExpected = int(prev_value[0] + prev_value[1])
                minutesExpected = int(prev_value[3] + prev_value[4])
                time_to_drive = calculate_time(p1, p2)
                slowest = ceil(time_to_drive * 1.30)
                average = 0
                for n in range(0, 500):
                    average = average + time_to_drive * (1 + randrange(30) / 100)
                average = ceil(average / 500)
                time_to_drive = ceil(time_to_drive)
                if minutesExpected + time_to_drive > 60:
                    resultsSchedules, prev_value = addition_lower_than_sixty(resultsSchedules, minutesExpected,
                                                                             hoursExpected, time_to_drive, slowest, average)
                else:
                    resultsSchedules, prev_value = addition_lower_than_sixty(resultsSchedules, minutesExpected,
                                                                             hoursExpected, time_to_drive, slowest, average)
                busStop = BusStop(line['horraire'][r + 1]['name'],
                                  line['horraire'][r + 1]['attractiveness'], p2.get_x(), p2.get_y())
                print("Arret [" + busStop.get_name() + "] - " + resultsSchedules[2])
                # To make people leave the bus, we set the attractivity to 0
                busStop.set_attractivity(0)
                print("personne à bord avant " + str(bus.get_passenger()))
                print("Personne décendu" + str(busStop.bus_happens(bus)))
                print("Personne montée" + str(bus.get_passenger() - bus.get_passenger() + busStop.bus_happens(bus)))
                # puisque qu'on est au terminus, on va retirer des gens déservie les gens qui sont montée et on va mettre =0
                bus.set_all_passenger(bus.get_all_passenger() - bus.get_passenger())
                bus.remove_passenger(bus.get_passenger())
                resultsSchedules.append(1)  # for the number of delay : default value
            else:
                """
                The process is almost the same as below. We juste have the time of arrival of the previous bus stop.
                - we obtain the value of the previous arrival in order to make an addition of it with the time it took to the bus to arrive to the next point
                - we obtain an average value for the delay
                - we write in 
                """
                p1 = Point2D(line['horraire'][r]['lat'], line['horraire'][r]['long'])
                p2 = Point2D(line['horraire'][r + 1]['lat'],
                             line['horraire'][r + 1]['long'])
                print("#----------------------------------------------#")
                resultsSchedules = add_name_expected_hours_to_tab(line['horraire'], r)
                hoursExpected = int(prev_value[0] + prev_value[1])
                minutesExpected = int(prev_value[3] + prev_value[4])
                time_to_drive = calculate_time(p1, p2)
                slowest = ceil(time_to_drive * 1.30)
                average = 0
                for n in range(0, 500):
                    average = average + time_to_drive * (1 + randrange(30) / 100)
                average = ceil(average / 500)
                time_to_drive = ceil(time_to_drive)
                # We fill the resultSchedules with the hours as a string in the function called.
                resultsSchedules, prev_value = addition_lower_than_sixty(resultsSchedules, minutesExpected,
                                                                         hoursExpected, time_to_drive, slowest, average)
                # We create the busStop on which the bus is arriving and we ensure that people are entering and leaving the bus according to their will.
                busStop = BusStop(line['horraire'][r + 1]['name'],
                                  line['horraire'][r + 1]['attractiveness'], p2.get_x(), p2.get_y())
                print("Arret [" + busStop.get_name() + "] - " + resultsSchedules[2])
                # busStop.bus_happens(bus)
                print("personne à bord avant " + str(bus.get_passenger()))
                nb_personne_bus_av_decente = bus.get_passenger()
                print("Personne décendu" + str(busStop.bus_happens(bus)))
                print("Personne montée" + str(
                    bus.get_passenger() - nb_personne_bus_av_decente + busStop.bus_happens(bus)))
                resultsSchedules.append(1)  # for the number of delay : default value
            resultBusStop.append(resultsSchedules)
        else:
            # This is the last stop
            bus.remove_passenger(bus.get_passenger())
            print("Stop [" + line['horraire'][r]['name'] + "] - Terminus")
            print("TERMINUS")

    # We save the result in finalDict that will be put in the lineResults table.
    finalDict = {"id_line": id, "name": name, "horraire": resultBusStop, "passager": bus.get_all_passenger(),
                 "nb_time_full": bus.get_booked_time()}
    print("On the line : " + name + " there were " + str(bus.get_all_passenger()) + " users and " + str(
        bus.get_booked_time()) + " that the bus was full")
    return finalDict


def magic(list_of_point):
    linesResults = []
    """
    We look at the whole JSON in order to simulate every bus line.
    """
    for i in range(len(list_of_point)):
        linesResults.append(simulateLine(list_of_point[i]))

    return linesResults