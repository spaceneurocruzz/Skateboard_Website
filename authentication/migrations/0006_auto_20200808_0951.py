# Generated by Django 3.0.7 on 2020-08-08 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_auto_20200722_0657'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.ImageField(upload_to='avatar'),
        ),
    ]