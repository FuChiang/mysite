from django.conf.urls.defaults import *

handler404 = 'main.views.index'
handler500 = 'main.views.index'


urlpatterns = patterns('',
	url(r'^$', 'main.views.index'),
	url(r'^login$', 'main.views.index', {'statue':'yes'}),
	url(r'^logout$', 'member.views.loginOut'),
	url(r'^dashboard/[0-9a-zA-Z]+', 'member.views.dashboard'),
	url(r'^home', 'main.views.home'),
	url(r'^new', 'main.views.new'),
	url(r'^popular', 'main.views.popular'),
	url(r'^categories', 'main.views.categories'),
	url(r'^sitemap', 'main.views.sitemap'),
	url(r'^member/join', 'member.views.joinMember'),
	url(r'^member/login', 'member.views.loginMember'),
	url(r'^member/facebookLogin', 'member.views.facebookLogin'),
	url(r'^member/googleLogin', 'member.views.googleLogin'),
)

