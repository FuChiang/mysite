# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponseRedirect
from photo.models import *


def index(request, statue = 'no'):
	if 'user' in request.session:
		return HttpResponseRedirect('/home')
	return  render(request, 'index/view.html', {'load': 'mainPage', 'login': statue})

def home(request):
	return  render(request, 'menuPage/home.html', {'load': 'homePage', 'topTitle': '分享&紀錄寵物的每一天'})

def view(request, priority):

	if request.method == 'GET':

		if priority == 'new':
			field = 'photo_date'
		elif priority == 'popular':
			field = 'photo_love'
		else:
			field = 'photo_comment'

		photosQuery = getAllPhotoData(field)
	return  render(request, 'menuPage/view.html', {'load': 'newPage', 'topTitle': '最新的寵物照', 'photosQuery': photosQuery})

def categories(request):
	return  render(request, 'menuPage/categories.html', {'load': 'categoriesPage', 'topTitle': '寵物照種類'})

def sitemap(request):
	return  render(request, 'sitemap/sitemap.xml')
