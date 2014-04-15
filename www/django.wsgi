
import os
import sys

path = '/home/fay/Desktop/mysite/www'

if path not in sys.path:
	sys.path.append(path)
 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "www.settings")
 
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

#Set database use pymysql insteal mysqldb
try:
	import pymysql
	pymysql.install_as_MySQLdb()
except ImportError:
	pass
