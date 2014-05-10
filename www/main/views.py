from django.shortcuts import render

def index(request):
	return  render(request, 'view.html', {'load': 'mainPage'})

def sitemap(request):
	return  render(request, 'sitemap.xml')