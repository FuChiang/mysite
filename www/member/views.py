# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from member.models import *
from photo.models import Upload
from wand.image import Image
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
			Profile.objects.create(account = user, password = pwd, email = em, api_id = 'none', pic='default.jpg')
			user = Profile.objects.get(account = user, password = pwd)
			request.session["user"] = user.account
			request.session["user_id"] = user.id
			request.session["user_pic"] = 'default.jpg'
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
				request.session["user_id"] = name.id
				request.session["user_pic"] = name.pic
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

		request.session["user"] = user.account
		request.session["user_id"] = user.id
		request.session["user_pic"] = user.pic
		
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

		request.session["user"] = user.account
		request.session["user_id"] = user.id
		request.session["user_pic"] = user.pic

		return HttpResponseRedirect('/home')

def loginOut(request):
	
	del request.session["user"]
	del request.session["user_id"]
	del request.session["user_pic"]

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

def myPhoto(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')

	#get photos which was be uploaded.  
	photosQuery = Upload.objects.filter(photo_account_id=request.session['user_id'])

	return render(request, 'member/dashboard/myPhoto.html', {'load': 'myPhotoPage', 'topTitle': '的瀏覽上傳照片', 'nowPage': 'myPhoto', 'photosQuery': photosQuery})

def shareMyPhoto(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')
	return render(request, 'member/dashboard/share.html', {'load': 'sharePage', 'topTitle': '的分享寵物照片', 'nowPage': 'sharePage'})


def setProfile(request):
	if 'user' not in request.session:
		return HttpResponseRedirect('/login')

	return render(request, '', {})
