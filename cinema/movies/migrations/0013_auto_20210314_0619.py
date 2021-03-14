# Generated by Django 3.1.7 on 2021-03-14 06:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0012_moviesession_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='moviesession',
            name='size',
        ),
        migrations.AlterField(
            model_name='moviesession',
            name='hall',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='movies.hall'),
        ),
    ]