# -*- coding: utf-8 -*-
from photo.models import *
from django.http import HttpResponse, HttpResponseRedirect
from wand.image import Image
from time import strftime
from django.conf import settings
from django.db.models import F
import json

def upload(request):

	if request.method == 'POST' and request.session["user_id"]:
		pic = request.FILES['sharePicImg'] if request.FILES['sharePicImg'] else None
		urlPic = request.POST.get('shareUrlPicImg', None)
		name = request.POST.get('shareName', None)
		tp = request.POST.get('shareType', None)
		des = request.POST.get('shareDescription' , "")
		filename = request.session["user"]+'_'+strftime('%Y%m%d%H%M%S')
		height = 0
		filename = None


		if name != None and tp != None:

			if urlPic != None and urlPicVailed(urlPic):
				filename = urlPic

			elif pic != None and sizeVailed(pic): 
				try:
					with Image(file=pic) as img:
						if img.format == 'JPG' or img.format == 'JPEG' or img.format == 'GIF' or img.format == 'PNG':
							height = img.height
							img.resize(500, 450)
							img.save(filename=settings.MEDIA_ROOT+'/photo/big/'+filename) 
							img.resize(200, 150)
							img.save(filename=settings.MEDIA_ROOT+'/photo/small/'+filename) 
				except:pass

			if filename != None:
				Upload.objects.create(photo_account_id = request.session["user_id"], photo_filename = filename, photo_pet_name = name, photo_description = des, photo_date = strftime('%Y/%m/%d-%H:%M:%S'), photo_love = 0, photo_type = tp)

	return HttpResponseRedirect('/myPhoto/'+request.session["user"])

def delete(request):

	if request.method == 'POST' and request.is_ajax() and request.session["user_id"]:

		data = json.loads(request.body.decode("utf-8"))

		photo_id = data['id'] if data['id'] and data['id'] !="" else None
		photo_name = data['name'] if data['name'] and data['name'] !="" else None

		if deleteVailed(photo_id, photo_name):
			deleteImg(settings.MEDIA_ROOT, photo_name)
			Upload.objects.get(id=photo_id, photo_account_id=request.session["user_id"]).delete()

	return HttpResponse('delete right')

def updateLove(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		photo_id = data['id']

		Upload.objects.filter(id=photo_id).update(photo_love=F('photo_love') +1)
	
	return HttpResponse('update right')

