# Generated by Django 3.2.5 on 2021-07-20 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('date_of_birth', models.DateTimeField(null=True)),
                ('sex', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('ssn', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('county', models.CharField(max_length=255)),
                ('zip', models.CharField(max_length=255)),
                ('phone_home', models.CharField(max_length=255)),
                ('signature', models.TextField()),
                ('phone_work', models.CharField(max_length=255)),
                ('phone_cell', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProfileTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('date_of_birth', models.DateTimeField(null=True)),
                ('sex', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('ssn', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('county', models.CharField(max_length=255)),
                ('zip', models.CharField(max_length=255)),
                ('phone_home', models.CharField(max_length=255)),

                ('phone_work', models.CharField(max_length=255)),
                ('phone_cell', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('reviewed', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'patients_profile_temp',
            },
        ),
        migrations.CreateModel(
            name='InformationTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('race', models.CharField(max_length=50)),
                ('marital', models.CharField(max_length=50)),
                ('language', models.CharField(max_length=50)),
                ('pcp_facility_name', models.CharField(max_length=50)),
                ('pcp_facility_address', models.CharField(max_length=255)),
                ('pcp_facility_city', models.CharField(max_length=255)),
                ('pcp_facility_state', models.CharField(max_length=255)),
                ('pcp_facility_zip', models.CharField(max_length=50)),
                ('pcp_name', models.CharField(max_length=50)),
                ('pcp_phone', models.CharField(max_length=50)),
                ('statement_receiver_name', models.CharField(max_length=50)),
                ('statement_receiver_address', models.CharField(max_length=255)),
                ('statement_receiver_city', models.CharField(max_length=255)),
                ('statement_receiver_zip', models.CharField(max_length=50)),
                ('statement_receiver_phone', models.CharField(max_length=50)),
                ('emergency_contactor_name', models.CharField(max_length=50)),
                ('emergency_contactor_phone', models.CharField(max_length=50)),
                ('employer_name', models.CharField(max_length=50)),
                ('employer_occupation', models.CharField(max_length=255)),
                ('employer_phone', models.CharField(max_length=50)),
                ('referred_by', models.CharField(max_length=50)),
                ('profile_temp', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                 related_name='information_temp', to='patients.profiletemp')),
            ],
            options={
                'db_table': 'patients_information_temp',
            },
        ),
        migrations.CreateModel(
            name='Information',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('race', models.CharField(max_length=50)),
                ('marital', models.CharField(max_length=50)),
                ('language', models.CharField(max_length=50)),
                ('pcp_facility_name', models.CharField(max_length=50)),
                ('pcp_facility_address', models.CharField(max_length=255)),
                ('pcp_facility_city', models.CharField(max_length=255)),
                ('pcp_facility_state', models.CharField(max_length=255)),
                ('pcp_facility_zip', models.CharField(max_length=50)),
                ('pcp_name', models.CharField(max_length=50)),
                ('pcp_phone', models.CharField(max_length=50)),
                ('statement_receiver_name', models.CharField(max_length=50)),
                ('statement_receiver_address', models.CharField(max_length=255)),
                ('statement_receiver_city', models.CharField(max_length=255)),
                ('statement_receiver_zip', models.CharField(max_length=50)),
                ('statement_receiver_phone', models.CharField(max_length=50)),
                ('emergency_contactor_name', models.CharField(max_length=50)),
                ('emergency_contactor_phone', models.CharField(max_length=50)),
                ('employer_name', models.CharField(max_length=50)),
                ('employer_occupation', models.CharField(max_length=255)),
                ('employer_phone', models.CharField(max_length=50)),
                ('referred_by', models.CharField(max_length=50)),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                 related_name='information', to='patients.profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ConsentFormTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('document_file', models.TextField()),
                ('consent_form', models.JSONField()),
                ('profile_temp', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                 related_name='consent_form_temp', to='patients.profiletemp')),
            ],
            options={
                'db_table': 'patients_consent_form_temp',
            },
        ),
        migrations.CreateModel(
            name='ConsentForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('document_file', models.TextField()),
                ('consent_form', models.JSONField()),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                 related_name='consent_form', to='patients.profile')),
            ],
            options={
                'db_table': 'patients_consent_form',
            },
        ),
    ]