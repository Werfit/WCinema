# Generated by Django 3.1.7 on 2021-03-14 06:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0013_auto_20210314_0619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieticket',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='movies.moviesession'),
        ),
    ]
