# Generated by Django 3.1.7 on 2021-03-16 21:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0015_auto_20210316_0518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moviesession',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sessions', to='movies.movie'),
        ),
    ]