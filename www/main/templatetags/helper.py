#coding:utf-8 

from django import template
import re

register = template.Library()

@register.filter
def checkImg(pic, size):
	
	re_url = re.compile(r"^https?:")
	
	if re_url.match(pic):
		return pic
	else:
		return '/static/img/photo/'+size+'/'+pic


@register.filter
def slice(name, num):
	if len(name) > 10:
		name = name[0:num]+'...'
	return name



