# Generated by Django 3.0.7 on 2020-07-18 17:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('friendsgroup', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='friendsgroup',
            old_name='group_dt',
            new_name='group_enddt',
        ),
        migrations.AddField(
            model_name='friendsgroup',
            name='group_startdt',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='friendsgroup',
            name='lower_limit',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='friendsgroup',
            name='uppper_limit',
            field=models.PositiveIntegerField(default=0),
        ),
    ]