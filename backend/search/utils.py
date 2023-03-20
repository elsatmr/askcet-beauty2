"""Helper Functions"""

def parse_type_type(data_type: type):
    data_type_str = str(data_type)
    if "object" in data_type_str:
        return "str"
    elif "int" in data_type_str:
        return "int"
    elif "float" in data_type_str:
        return "float"
    else:
        return
    

def parse_type(data: object, data_type: str):
    if data_type == "str":
        return str(data)
    elif data_type == "int":
        return int(data)
    elif data_type == "float":
        return float(data)
    else:
        return data