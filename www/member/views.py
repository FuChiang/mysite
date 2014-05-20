# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from member.models import *
from wand.image import Image
from wand.display import display
import json



def joinMember(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		user = str(data['account'])  if data['account'] and data['account']  !=""  else None
		pwd = str(data['password']) if data['password'] and data['password'] !=""  else None
		em = data['email'] if data['email'] and data['email'] !=""  else None

		if joinExistVaild(user):
			return HttpResponse('add existed')
		elif joinDataVaild(user, pwd, em):
			Profile.objects.create(account = user, password = pwd, email = em, api_id = 'none')
			request.session["user"] = user
			return HttpResponse('add right')
		else:
			return HttpResponse('add error')

def loginMember(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		user = str(data['account'])  if data['account'] and data['account']  !=""  else None
		pwd = str(data['password']) if data['password'] and data['password'] !=""  else None

		if loginDataVaild(user, pwd):
			try:
				name = Profile.objects.get(account = user, password = pwd)
				request.session["user"] = name.account
				return HttpResponse('login right')
			except Profile.DoesNotExist:
				return HttpResponse('login notExist')
		else:
			return HttpResponse('login error')

def facebookLogin(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))
		user = data['name'].replace(' ','')
		em = data['email']
		id = data['id']

		#apiJoin
		user = apiJoin(user, em, id)

		request.session["user"] = user
		
		return HttpResponse('login right')

def googleLogin(request):

	if request.method == 'GET':

		google_url = request.get_full_path().decode("utf-8")

		#split url paramers by sign '='
		explode_str = google_url.split('=')

		#splite and get first name and last name
		user = (((explode_str[16].replace('%40', '')).split('&'))[0]+' '+((explode_str[18].replace('%40', '')).split('&'))[0]).replace(' ','')
		
		#split email
		em = ((explode_str[14].replace('%40', '')).split('&'))[0]

		#split identify
		id = (((explode_str[9].split('&'))[0]).split('%3'))[3]

		#apiJoin
		user = apiJoin(user, em, id)

		request.session["user"] = user

		return HttpResponseRedirect('/home')

def loginOut(request):
	del request.session["user"]
	return HttpResponseRedirect('/')


def dashboard(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')

	memberQuery = Profile.objects.get(account = request.session["user"])

	return render(request, 'member/dashboard/dashboard.html', {'load': 'dashboardPage', 'topTitle': '的後台管理', 'nowPage': 'backendPage', 'memberQuery': memberQuery})
		
def message(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')
	return render(request, 'member/dashboard/message.html', {'load': 'messagePage', 'topTitle': '的訊息通知', 'nowPage': 'msgPage'})

def setProfile(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')
	return render(request, 'member/dashboard/setProfile.html', {'load': 'setProfilePage', 'topTitle': '的飼主頁面設定', 'nowPage': 'setPage'})

def account(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')
	return render(request, 'member/dashboard/account.html', {'load': 'setProfilePage', 'topTitle': '的飼主帳號設定', 'nowPage': 'accountPage'})

