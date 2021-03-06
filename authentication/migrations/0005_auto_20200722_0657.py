# Generated by Django 3.0.7 on 2020-07-22 06:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_auto_20200715_1221'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='group_create',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), null=True, size=None),
        ),
        migrations.AddField(
            model_name='customuser',
            name='group_join',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), null=True, size=None),
        ),
        migrations.AddField(
            model_name='customuser',
            name='group_like',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), null=True, size=None),
        ),
    ]
