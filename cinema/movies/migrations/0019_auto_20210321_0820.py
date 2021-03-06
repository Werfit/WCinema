# Generated by Django 3.1.7 on 2021-03-21 08:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0018_auto_20210318_2125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='moviesession',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', related_query_name='sessions', to='movies.movie'),
        ),
    ]
