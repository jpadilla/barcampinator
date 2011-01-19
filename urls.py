from django.conf.urls.defaults import *
import os.path
import settings
from registration import urls

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^barcampsj/', include('barcampsj.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)


urlpatterns += urls.urlpatterns

if settings.DEBUG:
  media = os.path.join(os.path.dirname(__file__), 'registration/static').replace('\\','/')
  urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': media}),
  )