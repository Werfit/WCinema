# Generated by Django 3.1.7 on 2021-03-22 06:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0019_auto_20210321_0820'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='desciption',
            new_name='description',
        ),
    ]