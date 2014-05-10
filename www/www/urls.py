from django.conf.urls.defaults import patterns, url


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'main.views.index'),
	url(r'^sitemap', 'main.views.sitemap'),
	url(r'^member/join', 'member.views.joinMember'),
	url(r'^member/login', 'member.views.loginMember'),
	url(r'^member/facebookLogin', 'member.views.facebookLogin'),
	url(r'^member/googleLogin', 'member.views.googleLogin'),
)
