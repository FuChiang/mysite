from django.db import connection, models
from datetime import datetime
import copy
import os

class Upload(models.Model):
	photo_filename = models.CharField(max_length = 40)
	photo_pet_name = models.CharField(max_length = 30)
	photo_description = models.TextField()
	photo_type = models.CharField(max_length = 8)
	photo_account_id = models.IntegerField(max_length = 11)
	photo_date = models.CharField(max_length = 20)
	photo_love = models.IntegerField(max_length = 10, default = 0, blank=True)
	photo_comment = models.IntegerField(max_length = 10, default = 0, blank=True)

def getAllPhotoData(field):
	cursor = connection.cursor()
	cursor.execute("select member_profile.pic, member_profile.account, photo_upload.id as pid,photo_upload.* from photo_upload join member_profile on photo_upload.photo_account_id = member_profile.id order by photo_upload."+field+" DESC")
	return dictAllData(cursor)

def dictAllData(data):
	field = data.description
	return[
		dict(zip([name[0] for name in field], raw))
		for raw in data.fetchall()
	]

def sizeVailed(file):

	max_size = 2
	state = True
	tmp = copy.deepcopy(file)

	if (len(tmp.file.read())/1024/1024) > max_size:
		state = False 

	return state

def deleteVailed(id, name):

	state = True

	if not id or id == "":
		state = False
	elif not name or name == "":
		state = False

	return state

def deleteImg(path, img):

	os.remove(path+'/photo/big/'+img)
	os.remove(path+'/photo/small/'+img)

