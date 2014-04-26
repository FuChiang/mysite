from django.shortcuts import render_to_response
import datetime

def index(request):
	now = datetime.datetime.now()
	return render_to_response('view.html', {'load': 'mainPage'})