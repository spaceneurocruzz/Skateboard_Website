# Generated by Django 3.0.7 on 2020-07-15 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guidemap', '0006_guidemapcomments_commenttitle'),
    ]

    operations = [
        migrations.RenameField(
            model_name='guidemapcomments',
            old_name='commentTitle',
            new_name='comment_title',
        ),
        migrations.AlterField(
            model_name='guidemap',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=4),
        ),
        migrations.AlterField(
            model_name='guidemapcomments',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=4),
        ),
    ]