from django.db import models
from django.core.validators import email_re
import re

class Profile(models.Model):
	account = models.CharField(max_length = 30)
	api_account = models.CharField(max_length = 30)
	password = models.CharField(max_length = 20)
	email = models.EmailField()


def joinDataVaild(user, pwd, em):

	vaildStatue = True

	if user == None or not 3 <= len(user) <= 30 or not user.isalnum():
		vaildStatue = False
	elif pwd == None or not 3 <= len(pwd) <= 20 or not pwd.isalnum():
		vaildStatue = False
	elif em == None or not email_re.match(em):
		vaildStatue = False

	return vaildStatue

def joinExistVaild(user):
	query = None
	exist = False
	try:
		query = Profile.objects.get(account=user)
		if query.account:
			exist = True
	except Profile.DoesNotExist:pass

	return exist


def loginDataVaild(user, pwd):
	vaildStatue = True

	if user == None or not 3 <= len(user) <= 30 or not user.isalnum():
		vaildStatue = False
	elif pwd == None or not 3 <= len(pwd) <= 20 or not pwd.isalnum():
		vaildStatue = False

	return vaildStatue




