# Generated by Django 3.0.7 on 2020-07-14 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guidemap', '0005_guidemapcomments_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='guidemapcomments',
            name='commentTitle',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
