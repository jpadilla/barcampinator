from django.db import models
from django.forms import ModelForm

class Barcamp(models.Model):
  name = models.CharField(max_length=60, blank=True)
  presentation_length = models.PositiveIntegerField()
  event_length = models.PositiveIntegerField()
  
  def __unicode__(self):
    return self.name

class User(models.Model):
  name = models.CharField(max_length=60)
  email = models.EmailField()
  twitter_username = models.CharField(max_length=60, blank=True)
  
  def __unicode__(self):
    return self.name

class PresentationCategory(models.Model):
  name = models.CharField(max_length=60)

  def __unicode__(self):
    return self.name
  
  class Meta:
    verbose_name_plural = "Presentation Categories"

class PresentationStatus(models.Model):
  name = models.CharField(max_length=60)
  
  def __unicode__(self):
    return self.name
  
  class Meta:
    verbose_name_plural = "Presentation Statuses"

class Presentation(models.Model):
  name = models.CharField(max_length=60)
  category = models.ForeignKey(PresentationCategory)
  user = models.ForeignKey(User)
  barcamp = models.ForeignKey(Barcamp)
  status = models.ForeignKey(PresentationStatus)
  
  def __unicode__(self):
    return self.name

class PresentationForm(ModelForm):
  class Meta:
    model = Presentation