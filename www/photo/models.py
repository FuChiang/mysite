from django.db import connection, models
from datetime import datetime
import urllib2
import urllib
import copy
import os

class Upload(models.Model):
	photo_filename = models.TextField()
	photo_pet_name = models.CharField(max_length = 30)
	photo_description = models.TextField()
	photo_type = models.CharField(max_length = 8)
	photo_account_id = models.IntegerField(max_length = 11)
	photo_date = models.CharField(max_length = 20)
	photo_love = models.IntegerField(max_length = 10, default = 0, blank=True)
	photo_comment = models.IntegerField(max_length = 10, default = 0, blank=True)

def getAllPhotoData(field, startNum):
	cursor = connection.cursor()
	cursor.execute("select member_profile.pic, member_profile.account, photo_upload.id as pid,photo_upload.* from photo_upload join member_profile on photo_upload.photo_account_id = member_profile.id order by photo_upload."+field+" DESC limit "+startNum+",18")
	return dictAllData(cursor)

def dictAllData(data):
	field = data.description
	return[
		dict(zip([name[0] for name in field], raw))
		for raw in data.fetchall()
	]

def transformField(priority):
	if priority == 'new':
		field = 'photo_date'
	elif priority == 'popular':
		field = 'photo_love'
	elif priority == 'comment':
		field = 'photo_comment'

	return field

def sizeVailed(file):

	max_size = 2
	state = True
	tmp = copy.deepcopy(file)

	if (len(tmp.file.read())/1024/1024) > max_size:
		state = False 

	return state

def urlPicVailed(url):

	try:
		reponse = urllib2.urlopen(urllib2.Request(url))
		state = True
	except:
		state = False

	return state

def deleteVailed(id, name):

	state = True

	if id == None or name == None:
		state = False
	else:
		name = name.split("_")
		if not name[0].isalnum() or not name[1].isalnum():
			state = False

	return state

def loadVaild(field):

	state = True

	if field == None:
		state = False
	elif field != 'photo_date' and field != 'photo_comment' and field != 'photo_love':
		state = False
	
	return state

def deleteImg(path, img):

	os.remove(path+'/photo/big/'+img)
	os.remove(path+'/photo/small/'+img)

def sliceStr(str, length):
	if len(str) > length:
		str = str[0:length]+"..."

	return str

