import geocoder
import json
def get_location_by_ip():
    g = geocoder.ip('me')
    if g.ok:
        return {
            'latitude': g.latlng[0],
            'longitude': g.latlng[1],
            'city': g.city,
            'country': g.country
        }
    return None

def buy(request):
    data=json.loads(request.body)
    print(data)
    location=get_location_by_ip()
    if location:  # Check if location is not None
     latitude = location['latitude']
     longitude = location['longitude']
     city = location['city']
     country = location['country']
    
     print(f"Latitude: {latitude}")
     print(f"Longitude: {longitude}")
     print(f"City: {city}")
     print(f"Country: {country}")
    else:
     print("Unable to retrieve location.")




    