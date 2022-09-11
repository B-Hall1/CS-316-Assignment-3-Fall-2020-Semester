#!C:\Users\Dipak Jadhav\AppData\Local\Programs\Python\Python39\python.exe

# print("Content-type:text/html\r\n\r\n")

import hashlib
import os
import json
import cgi

status = {}

print("Content-type:application/json\r\n\r\n")

dbfileName = 'db.txt'


def insert(name, value):
    flag = 0
    data = []
    with open(dbfileName, 'r+') as file:
        data = file.readlines()
        i = 0
        index = 0
        for item in data:
            old_name = item.split(":")
            if name == old_name[0]:
                index = i
                flag = 1
                break
            i += 1

    if flag == 0:
        data.append(name + ":" + value + "\n")
    else:
        data[index] = name + ":" + value + "\n"
	
    with open(dbfileName, 'w+') as file:
        line = "".join(data)
        file.write(line)
        status['message'] = "<div class = 'green' >Successfully inserted " + name + " = " + value + "</div>"
        status['success'] = True
        print(json.dumps(status, indent=1))


def retrieve(retrieve_name):
    flag = 0
    with open(dbfileName, 'r') as file:
        data = file.readlines()
        for item in data:
            name = item.split(":")
            # print(name)
            if retrieve_name == name[0]:
                # print("inner")
                flag = 1
                break
    if flag == 1:
        status['message'] = "<div class = 'green' >" + name[0] + " = " + name[1] + "</div>"
        status['success'] = True
        print(json.dumps(status, indent=1))
    else:
        status['message'] = "<div class = 'red'> The name " + name[0] + " is not in the database</div>"
        status['success'] = False
        print(json.dumps(status, indent=1))


def clear(password):
    if password == "really!":
        with open(dbfileName, 'w') as file:
            file.write("")
            status['message'] = "<div class = 'green' >database cleared</div>"
            status['success'] = True
            print(json.dumps(status, indent=1))
    else:
        status['message'] = "<div class = 'red'> wrong password </div>"
        status['success'] = False
        print(json.dumps(status, indent=1))


def digest(file_name):
    try:
        with open('C:\\xampp\\htdocs\\cgia\\' + file_name + '.txt', "r") as f:
            bytes = f.read().encode('utf-8')  # read entire file as bytes
            readable_hash = hashlib.sha256(bytes).hexdigest()

        status['message'] = '<div class = "green" >Digest  is ' + file_name + " : " + readable_hash + "</div>"
        status['success'] = True
        print(json.dumps(status, indent=1))
    except:
        status['message'] = "<div class = 'red'>Cannot read " + file_name + "</div>"
        status['success'] = False
        print(json.dumps(status, indent=1))


# # __________________________________BONUS________________________________________

def inspect(fileitem):
    if fileitem.filename:
        fn = os.path.basename(fileitem.filename)
        open('C:\\xampp\\htdocs\\cgia\\' + fn, 'wb').write(fileitem.file.read())
        # message = '<div class = "green" > The file "' + fn + '" was uploaded successfully</div>'
        try:
            with open('C:\\xampp\\htdocs\\cgia\\' + fn, "r") as f:
                bytes = f.read().encode('utf-8')  # read entire file as bytes
                readable_hash = hashlib.sha256(bytes).hexdigest()

                status['message'] = '<div class = "green" >Digest  is ' + fn + " : " + readable_hash + "</div>"
                status['success'] = True
                print(json.dumps(status, indent=1))
        except:
            status['message'] = "<div class = 'red'>Cannot read " + fn + "</div>"
            status['success'] = False
            print(json.dumps(status, indent=1))
    else:
        status['message'] = '<div class = "red">No file Presented</div>'
        status['success'] = False
        print(json.dumps(status, indent=1))


form = cgi.FieldStorage()
command = form.getvalue("command")
if command == "insert":
    insert(form.getvalue('name'), form.getvalue('value'))
if command == "retrieve":
    retrieve(form.getvalue('retrieve-name'))
if command == "clear":
    clear(form.getvalue('password'))
if command == "digest":
    digest(form.getvalue('filename'))
if command == "inspect":
    inspect(form['file'])
