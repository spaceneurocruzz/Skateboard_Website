# Generated by Django 3.0.7 on 2020-07-14 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guidemap', '0003_auto_20200713_1001'),
    ]

    operations = [
        migrations.AddField(
            model_name='guidemap',
            name='intro',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
