import time
import json
from flask import Flask, jsonify
from random import randint
app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

class PatienInList():

    def __init__(self, id, name, indication_type, triage, time, cause, team):
        self.id = id
        self.name = name
        self.indication_type = indication_type
        self.triage = triage
        self.time = time
        self.cause = cause
        self.team = team
    
    def serialize(self):
        return dict(id = self.id, name = self.name, indication_type = self.indication_type, triage = self.triage, time = self.time, cause = self.cause, team = self.team)

class Personnel():

    def __init__(self, id, name, role, shift_start, shift_end, team):
        self.id = id
        self.name = name
        self.role = role
        self.shift_start = shift_start
        self.shift_end = shift_end
        self.team = team
    
    def serialize(self):
        return dict(id = self.id, name = self.name, role = self.role, shift_start = self.shift_start, shift_end = self.shift_end, team = self.team)

class Ordination():

    def __init__(self, id, patient_id, medicine, instant, intake, dosage, amount, start_time, end_time, drip_info):
        self.id = id
        self.patient_id = patient_id
        self.medicine = medicine
        self.instant = instant
        self.intake = intake
        self.dosage = dosage
        self.amount = amount
        self.start_time = start_time
        self.end_time = end_time
        self.drip_info = drip_info
    
    def serialize(self):
        return dict(id = self.id, medicine = self.medicine, instant = self.instant, intake = self.intake, dosage = self.dosage, amount = self.amount, start_time = self.start_time, end_time = self.end_time, drip_info = self.drip_info)

class Medicine():

    def __init__(self, id, patient_id, medicine, intake, dosage, interval, start_date, end_date):
        self.id = id
        self.patient_id = patient_id
        self.medicine = medicine
        self.intake = intake
        self.dosage = dosage
        self.interval = interval
        self.start_date = start_date
        self.end_date = end_date
    
    def serialize(self):
        return dict(id = self.id, medicine = self.medicine, intake = self.intake, dosage = self.dosage, interval = self.interval, start_date = self.start_date, end_date = self.end_date)

class Timeline():

    def __init__(self, time, event, by_who, _type):
        self.time = time
        self.event = event
        self.by_who = by_who
        self._type = _type

    def serialize(self):
        return dict(time = self.time, event = self.event, by_who = self.by_who, type = self._type)


@app.route('/api/getpatients')
def get_patients():
    patients = []
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        patient = PatienInList(item["id"], item["first_name"] + " " + item["last_name"], item["indication_type"], item["triage"], item["time"], item["cause"], item["team"])
        patients.append(patient.serialize())

    return jsonify({"patients": patients})

    """for item in data:
        #ret.append(jsonify({"first_name": item["first_name"], "last_name": item["last_name"], "id": item["id"]}))
        temp = {"first_name": item["first_name"], "last_name": item["last_name"], "indication_type": item["indication_type"], "time": item["time"], "triage": ["triage"]}
        ret.append(json.dumps(temp))
    return jsonify({"patients": ret})"""

@app.route('/api/getonepatient/<int:id>')
def get_one_patient(id):
    ret = {}
    f = open('patients.json', )
    data = json.load(f)
    for item in data:
        if item["id"] == id:
            ret = item

    return jsonify({"patient": ret})


@app.route('/api/getECG') #TODO: link to patients, rewrite to GET /api/Patient/<int:id>/ECG or sumfin'
def get_ecg():
    with open("mock_master.json",'r') as f:
        mock_arr = json.load(f)
        return mock_arr[randint(0,len(mock_arr)-1)]  # 0-19 fake ECGs randomized. 

@app.route('/api/pbs/<int:id>')
def pbs(id):
    ret = {}
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == id:
            ret = item["pbs"]

    return jsonify({"patient": ret})

@app.route('/api/assessment/<int:id>')
def assessment(id):
    ret = {}
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == id:
            ret = item["assessment"]

    return jsonify({"patient": ret})

@app.route('/api/getordination/<int:id>')
def get_ordinations(id):
    ordinations = []

    with open('ordinations.json', encoding='utf-8') as fh:
        data = json.load(fh)


    for item in data:
        if item["patient_id"] == id:
            ordination = Ordination(item["id"], item["patient_id"], item["medicine"], item["instant"], item["intake"], item["dosage"], item["amount"], item["start_time"], item["end_time"], item["drip_info"])
            ordinations.append(ordination.serialize())

    return jsonify({"ordinations": ordinations})

@app.route('/api/getmedicine/<int:id>')
def get_medicine(id):
    medicines = []

    with open('medicine.json', encoding='utf-8') as fh:
        data = json.load(fh)


    for item in data:
        if item["patient_id"] == id:
            medicine = Medicine(item["id"], item["patient_id"], item["medicine"], item["intake"], item["dosage"], item["interval"], item["start_date"], item["end_date"])
            medicines.append(medicine.serialize())

    return jsonify({"medicines": medicines})

@app.route('/api/getTimeline/<int:id>')
def get_timeline(id):
    timeline_objects = []

    with open('timeline.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["id"] == id:
            for t in item["timeline"]:
                timeline = Timeline(t["time"], t["event"], t["by_who"], t["type"])
                timeline_objects.append(timeline.serialize())

    return jsonify({"timeline": timeline_objects})

@app.route('/api/getpersonnel')
def get_personnel():
    personnel = []
    with open('personnel.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        person = Personnel(item["id"], item["first_name"] + " " + item["last_name"], item["role"], item["shift_start"], item["shift_end"], item["team"])
        personnel.append(person.serialize())

    return jsonify({"personnel": personnel})
        



