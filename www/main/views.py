# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from photo.models import *
import json


def index(request, statue = 'no'):
	if 'user' in request.session:
		return HttpResponseRedirect('/home')
	return  render(request, 'index/view.html', {'load': 'mainPage', 'login': statue})

def home(request):
	return  render(request, 'menuPage/home.html', {'load': 'homePage', 'topTitle': '分享&紀錄寵物的每一天'})

def view(request, priority, type=None):

	photosQuery = None
	field = None
	statue = None

	if request.method == 'GET':

		statue = 'false' if priority == 'new' else 'true'

		field = transformField(priority)

		if loadVaild(field):

			photosQuery = getAllPhotoData(field, str(0), type)

			request.session['start_view_num'] = 18
			request.session['viewType'] = type if type != None else None

	return  render(request, 'menuPage/view.html', {'load': 'viewPage', 'topTitle': '觀賞寵物照', 'photosQuery': photosQuery, 'order': statue, 'type': type})

def ajaxview(request):
	
	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		field = transformField(data['field']) if data['field'] and data['field'] !="" else None

		if loadVaild(field):

			json_str = []

			photosQuery = getAllPhotoData(field, str(request.session['start_view_num']), request.session['viewType'])

			request.session['start_view_num'] = request.session['start_view_num']+17

			for value in photosQuery:

				json_str.append({
					"pic": ""+value["pic"]+"",
					"pid": ""+str(value["pid"])+"",
					"photo_filename": ""+value["photo_filename"]+"",
					"photo_pet_name": ""+sliceStr(value["photo_pet_name"], 10)+"",
					"photo_description": ""+sliceStr(value["photo_description"], 25)+"",
					"photo_type": ""+value["photo_type"]+"",
					"photo_account_id": ""+str(value["photo_account_id"])+"",
					"photo_date": ""+value["photo_date"]+"",
					"photo_love": ""+str(value["photo_love"])+"",
					"photo_comment": ""+str(value["photo_comment"])+"",
					"account": ""+value["account"]+""
				})

			return HttpResponse(json.dumps(json_str), mimetype='application/json')

def categories(request):

	if request.method == 'GET':

		photosQuery = getAllCategory()

	return  render(request, 'menuPage/categories.html', {'load': 'categoriesPage', 'topTitle': '寵物照種類', 'photosQuery': photosQuery})

def sitemap(request):
	return  render(request, 'sitemap/sitemap.xml')
