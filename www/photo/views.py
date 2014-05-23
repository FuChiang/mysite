# -*- coding: utf-8 -*-
from photo.models import *
from django.http import HttpResponse, HttpResponseRedirect
from wand.image import Image
from time import strftime
from django.conf import settings
import json

def upload(request):

	if request.method == 'POST':
		pic = request.FILES['sharePicImg']
		title = request.POST.get('shareTitle', None)
		tp = request.POST.get('shareType', None)
		des = request.POST.get('shareDescription' , "")
		name = request.session["user"]+'_'+strftime('%Y%m%d%H%M%S')


		if title != None and tp != None and sizeVailed(pic):  

			try:
				with Image(file=pic) as img:
					height = img.height
					img.resize(500, height) 
					img.save(filename=settings.MEDIA_ROOT+'/photo/big/'+name) 
					img.resize(300, height)
					img.save(filename=settings.MEDIA_ROOT+'/photo/small/'+name) 
			except:pass

			Upload.objects.create(photo_account_id = request.session["user_id"], photo_name = name, photo_title = title, photo_description = des, photo_date = strftime('%Y/%m/%d-%H:%M:%S'), photo_love = 0, photo_type = tp)

	return HttpResponseRedirect('/dashboard/'+request.session["user"])