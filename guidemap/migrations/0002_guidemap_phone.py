# Generated by Django 3.0.7 on 2020-07-09 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guidemap', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='guidemap',
            name='phone',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
