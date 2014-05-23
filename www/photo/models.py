from django.db import models
from datetime import datetime
import copy

class Upload(models.Model):
	photo_name = models.CharField(max_length = 40)
	photo_title = models.CharField(max_length = 30)
	photo_description = models.TextField()
	photo_type = models.CharField(max_length = 8)
	photo_account_id = models.IntegerField(max_length = 11)
	photo_date = models.CharField(max_length = 20)
	photo_love = models.IntegerField(default = 0, blank=True)

def sizeVailed(file):

	max_size = 2
	state = True
	tmp = copy.deepcopy(file)

	if (len(tmp.file.read())/1024/1024) > max_size:
		state = False 

	return state

