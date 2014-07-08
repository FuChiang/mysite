# -*- coding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.db import transaction
from django.db.models import F
from photo.models import *
from wand.image import Image
from time import strftime
import json
import urllib
import os

@transaction.commit_on_success
def upload(request):

	if request.method == 'POST' and request.session["user_id"]:
		urlPic = request.POST.get('shareUrlPicImg', None)
		name = request.POST.get('shareName', None)
		picDir = settings.MEDIA_ROOT+'/photo/'
		tp = request.POST.get('shareType', None)
		des = request.POST.get('shareDescription' , "無")
		filename = request.session["user"]+'_'+strftime('%Y%m%d%H%M%S')
		pic = None
		size = {"big": [500, 450], "small": [200, 150]}

		if name != None and tp != None:

			if urlPic != None and urlPicVailed(urlPic):

				urllib.urlretrieve(urlPic, picDir+filename)

				pic = urllib.urlopen('http://www.cutepaw.idv.tw/static/img/photo/'+filename)
			else:
				try:
					pic = request.FILES['sharePicImg']
				except:pass

			if pic != None or sizeVailed(pic):
				try:
					with Image(file=pic) as img:
						if img.format == 'JPG' or img.format == 'JPEG' or img.format == 'GIF' or img.format == 'PNG':
							img.resize(size["big"][0], size["big"][1])
							img.save(filename=picDir+'big/'+filename)
							img.resize(size["small"][0], size["small"][1])
							img.save(filename=picDir+'small/'+filename)

							if urlPic != None:
								deleteImg(filename)
				except:pass

				Upload.objects.create(photo_account_id = request.session["user_id"], photo_filename = filename, photo_pet_name = name, photo_description = des, photo_date = strftime('%Y/%m/%d-%H:%M:%S'), photo_love = 0, photo_type = tp)
				Category.objects.filter(photo_type = tp).update(photo_type_total=F('photo_type_total')+1)
	
	return HttpResponseRedirect('/myPhoto/'+request.session["user"])

@transaction.commit_on_success
def delete(request):

	if request.method == 'POST' and request.is_ajax() and request.session["user_id"]:

		data = json.loads(request.body.decode("utf-8"))

		photo_id = data['id'] if data['id'] and data['id'] !="" else None
		photo_name = data['name'] if data['name'] and data['name'] !="" else None
		photo_type = data['type'] if data['type'] and data['type'] !="" else None

		if deleteVailed(photo_id, photo_name, photo_type):
			Upload.objects.get(id=photo_id, photo_account_id=request.session["user_id"]).delete()
			Category.objects.filter(photo_type = photo_type).update(photo_type_total=F('photo_type_total')-1)
			deleteImg(photo_name, '/photo/big/')
			deleteImg(photo_name, '/photo/small/')

	return HttpResponse('delete right')

def updateLove(request):

	if request.method == 'POST' and request.is_ajax():

		data = json.loads(request.body.decode("utf-8"))

		photo_id = data['id']

		Upload.objects.filter(id=photo_id).update(photo_love=F('photo_love') +1)
	
	return HttpResponse('update right')

