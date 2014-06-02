#coding:utf-8 

from django import template
register = template.Library()

@register.filter
def slice(value, limit):
	if len(value) >=limit:
		value = value[:limit-1]
	return value

