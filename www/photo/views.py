# -*- coding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.db.models import F
from photo.models import *
from wand.image import Image
from time import strftime
import json
import urllib
import os

def upload(request):

	if request.method == 'POST' and request.session["user_id"]:
		urlPic = request.POST.get('shareUrlPicImg', None)
		name = request.POST.get('shareName', None)
		tp = request.POST.get('shareType', None)
		des = request.POST.get('shareDescription' , "")
		picDir = settings.MEDIA_ROOT+'/photo/'
		filename = request.session["user"]+'_'+strftime('%Y%m%d%H%M%S')
		pic = None
		size = {"big": [500, 450], "small": [200, 150]}

		if name != None and tp != None:

			if urlPic != None and urlPicVailed(urlPic):

				urllib.urlretrieve(urlPic, picDir+filename)

				pic = urllib2.urlopen('http://www.cutepaw.idv.tw/static/img/photo/'+filename)
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
								os.remove(picDir+filename)
				except:pass
				#Upload.objects.create(photo_account_id = request.session["user_id"], photo_filename = filename, photo_pet_name = name, photo_description = des, photo_date = strftime('%Y/%m/%d-%H:%M:%S'), photo_love = 0, photo_type = tp)

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

