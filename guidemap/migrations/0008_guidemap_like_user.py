# Generated by Django 3.0.7 on 2020-07-28 08:00

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guidemap', '0007_auto_20200715_1221'),
    ]

    operations = [
        migrations.AddField(
            model_name='guidemap',
            name='like_user',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=20), null=True, size=None),
        ),
    ]
