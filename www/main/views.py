from django.shortcuts import render

def index(request):
	return  render(request, 'view.html', {'load': 'mainPage'})

def home(request):
	return  render(request, 'home.html', {})

def sitemap(request):
	return  render(request, 'map.xml')