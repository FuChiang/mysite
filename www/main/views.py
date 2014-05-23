# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponseRedirect


def index(request, statue = 'no'):
	if 'user' in request.session:
		return HttpResponseRedirect('/home')
	return  render(request, 'index/view.html', {'load': 'mainPage', 'login': statue})

def home(request):
	return  render(request, 'menuPage/home.html', {'load': 'homePage', 'topTitle': '分享&紀錄寵物的每一天'})

def new(request):
	return  render(request, 'menuPage/new.html', {'load': 'newPage', 'topTitle': '最新的寵物照'})

def popular(request):
	return  render(request, 'menuPage/popular.html', {'load': 'popularPage', 'topTitle': '人氣的寵物照'})

def categories(request):
	return  render(request, 'menuPage/categories.html', {'load': 'categoriesPage', 'topTitle': '寵物照種類'})

def sitemap(request):
	return  render(request, 'sitemap/sitemap.xml')
