# Generated by Django 3.1.7 on 2021-03-13 20:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('movies', '0009_movieticket_number'),
    ]

    operations = [
        migrations.CreateModel(
            name='MovieOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tickets_number', models.PositiveIntegerField(default=1)),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.moviesession')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='MovieTicket',
        ),
    ]
