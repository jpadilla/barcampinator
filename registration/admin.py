from django.contrib import admin
from registration.models import *

class PresentationAdmin(admin.ModelAdmin):
  list_display = ('name', 'user', 'status', 'category')
  list_filter = ('status', 'category')

admin.site.register(Barcamp)
admin.site.register(User)
admin.site.register(PresentationCategory)
admin.site.register(Presentation, PresentationAdmin)
admin.site.register(PresentationStatus)