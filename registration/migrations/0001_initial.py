# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'Barcamp'
        db.create_table('registration_barcamp', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=60, blank=True)),
            ('presentation_length', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('event_length', self.gf('django.db.models.fields.PositiveIntegerField')()),
        ))
        db.send_create_signal('registration', ['Barcamp'])

        # Adding model 'User'
        db.create_table('registration_user', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=60)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('twitter_username', self.gf('django.db.models.fields.CharField')(max_length=60, blank=True)),
        ))
        db.send_create_signal('registration', ['User'])

        # Adding model 'PresentationCategory'
        db.create_table('registration_presentationcategory', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=60)),
        ))
        db.send_create_signal('registration', ['PresentationCategory'])

        # Adding model 'PresentationStatus'
        db.create_table('registration_presentationstatus', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=60)),
        ))
        db.send_create_signal('registration', ['PresentationStatus'])

        # Adding model 'Presentation'
        db.create_table('registration_presentation', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=60)),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['registration.PresentationCategory'])),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['registration.User'])),
            ('barcamp', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['registration.Barcamp'])),
            ('status', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['registration.PresentationStatus'])),
        ))
        db.send_create_signal('registration', ['Presentation'])


    def backwards(self, orm):
        
        # Deleting model 'Barcamp'
        db.delete_table('registration_barcamp')

        # Deleting model 'User'
        db.delete_table('registration_user')

        # Deleting model 'PresentationCategory'
        db.delete_table('registration_presentationcategory')

        # Deleting model 'PresentationStatus'
        db.delete_table('registration_presentationstatus')

        # Deleting model 'Presentation'
        db.delete_table('registration_presentation')


    models = {
        'registration.barcamp': {
            'Meta': {'object_name': 'Barcamp'},
            'event_length': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60', 'blank': 'True'}),
            'presentation_length': ('django.db.models.fields.PositiveIntegerField', [], {})
        },
        'registration.presentation': {
            'Meta': {'object_name': 'Presentation'},
            'barcamp': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['registration.Barcamp']"}),
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['registration.PresentationCategory']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60'}),
            'status': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['registration.PresentationStatus']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['registration.User']"})
        },
        'registration.presentationcategory': {
            'Meta': {'object_name': 'PresentationCategory'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60'})
        },
        'registration.presentationstatus': {
            'Meta': {'object_name': 'PresentationStatus'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60'})
        },
        'registration.user': {
            'Meta': {'object_name': 'User'},
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '60'}),
            'twitter_username': ('django.db.models.fields.CharField', [], {'max_length': '60', 'blank': 'True'})
        }
    }

    complete_apps = ['registration']
