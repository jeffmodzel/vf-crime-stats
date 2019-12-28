import csv


with open('data_1.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    data = []
    for row in csv_reader:
        data.append(row)

    print(len(data))
    print(data[0]['INCIDENT_ID'])
    print(data[0]['OFFENSE_ID'])
    print(data[0]['OFFENSE_CODE'])
    print(data[0]['OFFENSE_CODE_EXTENSION'])
    print(data[0]['OFFENSE_TYPE_ID'])
    print(data[0]['OFFENSE_CATEGORY_ID'])
    print(data[0]['FIRST_OCCURRENCE_DATE'])
    print(data[0]['LAST_OCCURRENCE_DATE'])
    print(data[0]['REPORTED_DATE'])
    print(data[0]['INCIDENT_ADDRESS'])
    print(data[0]['GEO_X'])
    print(data[0]['GEO_Y'])
    print(data[0]['GEO_LAT'])
    print(data[0]['GEO_LON'])
    print(data[0]['DISTRICT_ID'])
    print(data[0]['PRECINCT_ID'])
    print(data[0]['NEIGHBORHOOD_ID'])
    print(data[0]['IS_CRIME'])
    print(data[0]['IS_TRAFFIC'])
