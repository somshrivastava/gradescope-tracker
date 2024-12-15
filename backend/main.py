from gradescopeapi.classes.connection import GSConnection
from credentials import PASSWORD

# create connection and login
connection = GSConnection()
connection.login("rusia.n@northeastern.edu", PASSWORD)

grading = {
    "homework": .3,
    "lab": .1,
    "exam": .6
}

course_id = "805735"

def get_type(assignment_name):
    for key in grading.keys():
        if key in assignment_name.lower():
            return key.lower()

assignments = connection.account.get_assignments(course_id)
grades = {
    "points": {
        "homework": 0.0,
        "lab": 0.0,
        "exam": 0.0,
    },
    "max_points": {
        "homework": 0.0,
        "lab": 0.0,
        "exam": 0.0,
    }
}

print(assignments)
for assignment in assignments:
    if assignment.grade != None:
        grades["points"][get_type(assignment.name)] += assignment.grade
        grades["max_points"][get_type(assignment.name)] += assignment.max_grade

final_grade = 0
for grade in grades["points"].keys():
    final_grade += (grades["points"][grade] / grades["max_points"][grade]) * (grading[grade])

print(str(round(final_grade * 100, 2)))