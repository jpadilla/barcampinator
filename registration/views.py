from django.shortcuts import render_to_response
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
from django.db.models import Count
from django.db.models import Q
from models import *
from django.utils.encoding import *
import json
import hashlib

# Views

def jsonapi(request, url):

  if(url == 'presentations/update'):
    if(request.POST):
        post_data = request.POST

        # Read variables from post and decide to flag a presentation started or finished. 
        presentation = post_data.get('presentation_id')
        status = post_data.get('status_id')

        p = Presentation.objects.filter(id = presentation).update(status = status)

        return HttpResponse(p, mimetype='application/json')

  if(url == 'presentations'):

    presentations = Presentation.objects.filter(~Q(status = 2))[:7]

    sha1 = hashlib.sha1()

    hash_string = ''

    for p in presentations:
      hash_string += u"presentation_id: " + str(p.id) + " status: " + str(p.status)

    sha1.update(hash_string)

    data = [{'hash': sha1.hexdigest()}]

    for p in presentations:
      data.append({'presentation_id': p.id, 'name':p.name, 'status':p.status.name,'user':p.user.name,\
      'category':p.category.name, 'twitter_name':p.user.twitter_username})  

    out = json.dumps(data)
    return HttpResponse(out, mimetype='application/json')

  if(url == 'presentation_count'):
    c = Presentation.objects.all()
    out = serializers.serialize("json", c)
    return HttpResponse(out, mimetype='application/json')

  if(url == 'categories'):
    c = PresentationCategory.objects.all()
    out = serializers.serialize("json", c)
    return HttpResponse(out, mimetype='application/json')

  if(url == 'users'):
    u = User.objects.all()
    out = serializers.serialize("json", u)
    return HttpResponse(out, mimetype='application/json')

  if(url == 'barcamp'):
    e = Barcamp.objects.all()
    out = serializers.serialize("json", e)
    return HttpResponse(out, mimetype='application/json')

  if(url == 'statuses'):
    s = PresentationStatus.objects.all()
    out = serializers.serialize("json", s)
    return HttpResponse(out, mimetype='application/json')

  return render_to_response('error.html', {'url':url})


def index(request):
  return HttpResponseRedirect('/register')

def register(request):
  thanks = {}

  categories = PresentationCategory.objects.all()

  post_data = {}

  if(request.POST):
    post_data = request.POST

    thanks = True

    # Create user
    u = User(name = post_data['name'], email = post_data['email'],
     twitter_username = valid_twitter_username(post_data['twitter_username']))
    u.save()

    # Get Barcamp
    b = Barcamp.objects.get(id=1)

    if(post_data['presentation'] == u'yes'):
      # Get Category
      c = PresentationCategory.objects.get(id=post_data['category'])

      # Set default status (created)
      s = PresentationStatus.objects.get(id=4)

      # Create presentation
      p = Presentation(name = post_data['presentation_title'], category = c,
       user = u, barcamp = b, status = s)

      p.save()

  return render_to_response('register.html', {'categories':categories, 'thanks':thanks})

def tv(request):
  return render_to_response('tv.html')

def valid_twitter_username(username):
  return username.replace('@', '') if username[0] == '@' else username
