# -*- coding: utf-8 -*-

from django.conf.urls import *

handler404 = 'main.views.index'
handler500 = 'main.views.index'


urlpatterns = patterns('',

	#front end page urls
	url(r'^$', 'main.views.index'),
	url(r'^login$', 'main.views.index', {'statue':'yes'}),
	url(r'^member/join', 'member.views.joinMember'),
	url(r'^member/login', 'member.views.loginMember'),
	url(r'^member/facebookLogin', 'member.views.facebookLogin'),
	url(r'^member/googleLogin', 'member.views.googleLogin'),
	
	#main page urls
	url(r'^home$', 'main.views.home'),
	url(r'^viewPhoto/new', 'main.views.view', {'priority':'new'}),
	url(r'^viewPhoto/popular', 'main.views.view', {'priority':'popular'}),
	url(r'^viewPhoto/type/(?P<type>[^0-9a-zA-Z])+/$', 'main.views.view', {'priority':'popular'}),
	url(r'^scrollNext$', 'main.views.ajaxview'),
	url(r'^categories$', 'main.views.categories'),
	url(r'^updatePhotoLove', 'photo.views.updateLove'),
	
	#dashboard page top meau urls
	url(r'^dashboard/[0-9a-zA-Z]+', 'member.views.dashboard'),
	url(r'^message/[0-9a-zA-Z]+', 'member.views.message'),
	url(r'^myPhoto/[0-9a-zA-Z]+', 'member.views.myPhoto'),
	url(r'^shareMyPhoto', 'member.views.shareMyPhoto'),
	url(r'^logout$', 'member.views.loginOut'),

	#dashboard page home menu
	url(r'^sharePhoto', 'photo.views.upload'),
	url(r'^setProfile', 'member.views.setProfile'),

	#dashboard page relation opeator
	url(r'^deletePhoto', 'photo.views.delete'),

	#sitemap page urls
	url(r'^sitemap', 'main.views.sitemap'),


)

