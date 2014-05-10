from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from member.models import *
import json
import urlparse

def joinMember(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		user = str(data['account'])  if data['account'] and data['account']  !=""  else None
		pwd = str(data['password']) if data['password'] and data['password'] !=""  else None
		em = data['email'] if data['email'] and data['email'] !=""  else None

		if joinExistVaild(user):
			return HttpResponse('add existed')
		elif joinDataVaild(user, pwd, em):
			Profile.objects.create(account = user, password = pwd, email = em, api_account = 'none')
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
		user = data['name']
		em = data['email']

		if not joinExistVaild(user):
			Profile.objects.create(account = user, password = 0, email = em, api_account = user)
		
		request.session["user"] = user
		
	return HttpResponse('Success login by facebook')

def googleLogin(request):

	if request.method == 'GET':

		google_url = request.get_full_path().decode("utf-8")

		#split url paramers by sign '='
		explode_str = google_url.split('=')

		#splite and get first name and last name
		user = ((explode_str[16].replace('%40', '')).split('&'))[0]+' '+((explode_str[18].replace('%40', '')).split('&'))[0]
		
		#split email
		em = ((explode_str[14].replace('%40', '')).split('&'))[0]

		if not joinExistVaild(user):
			Profile.objects.create(account = user, password = 0, email = em, api_account = user)
			request.session["user"] = user
		
	return HttpResponseRedirect('/')

def loginOut(request):
	del request.session["user"]
	return HttpResponseRedirect('/')
		
		