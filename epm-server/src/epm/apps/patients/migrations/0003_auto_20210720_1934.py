# Generated by Django 3.2.5 on 2021-07-20 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0002_auto_20210720_1932'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='last_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='profiletemp',
            name='last_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
