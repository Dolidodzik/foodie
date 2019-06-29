from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Importing scripts for api control files
import app.scripts_for_api_control.main as SFAC
from app.scripts_for_api_control.high_level_code import *
import ast

def home(request):

    # Getting ajax request
    if request.is_ajax():

        # Storing location data from request
        location = {}
        location['Latitude'] = request.POST['location[Latitude]']
        location['Longitude'] = request.POST['location[Longitude]']

        print("location that ajax sent: ", location)

        # This should be replaced with data about found places
        return HttpResponse("JD KRASNOLUDA")
    else:
        return render(request, "home.html", {"places": SFAC.places})


def place_details(request, place_id):

    '''session_name = 'place_details' + str(place_id)

    if not request.session[session_name] == None:
        request.session[session_name] = places_info.get_place_details(place_id)
    print("Data:", request.session[session_name])
    request.session[session_name] = places_info.get_place_details(place_id)'''

    details = places_info.get_place_details(place_id)

    # Rendering template with place details data
    return render(request, "place_details.html", {"details": details})


# This view returns JSON of images to template
def image_gallery(request, place_id):

    # Getting object of place details
    details = places_info.get_place_details(place_id)
    #print(type(details))
    # (Later when i setup frontend framework I should get it with request.POST['data'] to dont use API that much)
    #reviews = details['reviews']

    return HttpResponse("ELODJ")
