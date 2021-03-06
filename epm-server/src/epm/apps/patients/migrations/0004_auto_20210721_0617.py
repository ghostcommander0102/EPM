# Generated by Django 3.2.5 on 2021-07-21 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0003_auto_20210720_1934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consentform',
            name='consent_form',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='consentform',
            name='document_file',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='consentformtemp',
            name='consent_form',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='consentformtemp',
            name='document_file',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='sex',
            field=models.CharField(choices=[('male', 'Initial'), ('female', 'Waiting'), ('other', 'Accepted'), ('', 'Rejected')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='profiletemp',
            name='sex',
            field=models.CharField(choices=[('male', 'Initial'), ('female', 'Waiting'), ('other', 'Accepted'), ('', 'Rejected')], default='', max_length=50),
        ),
    ]
