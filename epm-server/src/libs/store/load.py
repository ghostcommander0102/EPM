import json
import os

import pandas as pd
from server.settings import base_dir


if __name__ == '__main__':
    csv_path = os.path.join(base_dir, "data/csv", "patients.csv")

    df = pd.read_csv(csv_path)
    df = df.fillna('')
    data = df.to_dict(orient='records')

    patients = []
    for row in data:
        patients.append({
            "pid": row['Id'],
            "dob": row['BIRTHDATE'],
            "ssn": row['SSN'],
            "drivers": row['DRIVERS'],
            "passport": row['PASSPORT'],
            "prefix": row['PREFIX'],
            "firstName": ''.join([i for i in row['FIRST'] if not i.isdigit()]),
            "lastName": ''.join([i for i in row['LAST'] if not i.isdigit()]),
            "suffix": row['SUFFIX'],
            "maiden": row['MAIDEN'],
            "marital": row['MARITAL'],
            "race": row['RACE'],
            "ethnicity": row['ETHNICITY'],
            "gender": row['GENDER'],
            "birthPlace": row['BIRTHPLACE'],
            "address": row['ADDRESS'],
            "city": row['CITY'],
            "state": row['STATE'],
            "county": row['COUNTY'],
            "zip": row['ZIP'],
            "lat": row['LAT'],
            "lon": row['LON'],
            "healthcareExpenses": row['HEALTHCARE_EXPENSES'],
            "healthcareCoverage": row['HEALTHCARE_COVERAGE']
        })

    print(df.head())
    print(df.columns)
    print(patients[:2])

    # ['Id', 'BIRTHDATE', 'DEATHDATE', 'SSN', 'DRIVERS', 'PASSPORT', 'PREFIX',
    #        'FIRST', 'LAST', 'SUFFIX', 'MAIDEN', 'MARITAL', 'RACE', 'ETHNICITY',
    #        'GENDER', 'BIRTHPLACE', 'ADDRESS', 'CITY', 'STATE', 'COUNTY', 'ZIP',
    #        'LAT', 'LON', 'HEALTHCARE_EXPENSES', 'HEALTHCARE_COVERAGE']

    with open(os.path.join(base_dir, "data", "patients.json"), "w") as jp:
        json.dump(patients, jp)
