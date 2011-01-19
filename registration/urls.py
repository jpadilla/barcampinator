from django.conf.urls.defaults import *
import views

urlpatterns = patterns('',
    
    (r'^$', 'barcampinator.registration.views.index'),
    (r'^register/$', 'barcampinator.registration.views.register'),
	(r'^jsonapi/(\S+)/$', 'barcampinator.registration.views.jsonapi'),
	(r'^tv/$', 'barcampinator.registration.views.tv'),
)