from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import re
from math import radians, sin, cos, sqrt, atan2

def is_within_1km(lat1, lon1, lat2, lon2):
    # Radius of the Earth in km
    R = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    # Compute differences
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Haversine formula
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c

    # Check if distance is within 1 km
    return distance <= 1.0
@csrf_exempt  # Disable CSRF protection for this view (use with caution)
def getlocation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the incoming JSON data
            longitude = data.get('longitude')
            latitude = data.get('latitude')

            if longitude is None or latitude is None:
                return JsonResponse({"error": "Missing longitude or latitude"}, status=400)

            ip = f"{latitude}, {longitude}"
            print(f"coordinates:{ip}")


            latitude_dms = "27°40'46.2\"N"
            longitude_dms = "85°16'10.2\"E"

            latitude_decimal = dms_to_decimal(latitude_dms)
            longitude_decimal = dms_to_decimal(longitude_dms)


            if is_within_1km(latitude, longitude, latitude_decimal,longitude_decimal):
                print("Yes, it is near")
                return JsonResponse({"message": "Location received", "longitude": longitude, "latitude": latitude, "near": True})
            else:
                print("No, it is far")
                return JsonResponse({"message": "Location received", "longitude": longitude, "latitude": latitude, "near": False})


        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
    




def dms_to_decimal(dms_str):
    """
    Convert a DMS (degrees, minutes, seconds) string to decimal degrees.
    Example input: "27°41'46.4\"N"
    """

    # Regular expression to parse the DMS string
    dms_pattern = re.compile(r"(\d+)°(\d+)'([\d.]+)\"([NSEW])")
    match = dms_pattern.match(dms_str)

    if not match:
        raise ValueError("Invalid DMS format")

    degrees, minutes, seconds, direction = match.groups()
    degrees = float(degrees)
    minutes = float(minutes)
    seconds = float(seconds)

    # Convert to decimal degrees
    decimal_degrees = degrees + (minutes / 60) + (seconds / 3600)

    # Adjust for direction
    if direction in ['S', 'W']:
        decimal_degrees = -decimal_degrees

    return decimal_degrees