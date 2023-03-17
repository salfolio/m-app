import csv

def check_csv_for_value(file_path):
    with open(file_path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if 'lebron' in row:
                return True
    return False
