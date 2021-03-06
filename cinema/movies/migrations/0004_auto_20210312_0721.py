# Generated by Django 3.1.7 on 2021-03-12 07:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_moviesession_tickets_bought'),
    ]

    operations = [
        migrations.AddField(
            model_name='moviesession',
            name='end_day',
            field=models.DateField(default=datetime.datetime(2021, 3, 12, 7, 21, 0, 620180, tzinfo=utc)),
        ),
        migrations.AddField(
            model_name='moviesession',
            name='start_day',
            field=models.DateField(default=datetime.datetime(2021, 3, 12, 7, 21, 0, 620158, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='moviesession',
            name='end',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='moviesession',
            name='start',
            field=models.DateTimeField(),
        ),
    ]
