# Generated by Django 5.1.3 on 2024-12-06 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0002_useraccount_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='role',
            field=models.CharField(default='', max_length=500),
        ),
    ]
