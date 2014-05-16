from django.conf.urls.defaults import *

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
	url(r'^home', 'main.views.home'),
	url(r'^new', 'main.views.new'),
	url(r'^popular', 'main.views.popular'),
	url(r'^categories', 'main.views.categories'),
	
	#dashboard page urls
	url(r'^dashboard/[0-9a-zA-Z]+', 'member.views.dashboard'),
	url(r'^message/[0-9a-zA-Z]+', 'member.views.message'),
	url(r'^setProfile/[0-9a-zA-Z]+', 'member.views.setProfile'),
	url(r'^account/[0-9a-zA-Z]+', 'member.views.account'),
	url(r'^logout$', 'member.views.loginOut'),

	#sitemap page urls
	url(r'^sitemap', 'main.views.sitemap'),
)

