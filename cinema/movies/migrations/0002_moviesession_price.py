# Generated by Django 3.1.7 on 2021-03-12 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='moviesession',
            name='price',
            field=models.PositiveIntegerField(default=10),
            preserve_default=False,
        ),
    ]
