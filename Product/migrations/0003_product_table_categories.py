# Generated by Django 5.1.3 on 2024-12-12 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0002_product_table_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='product_table',
            name='categories',
            field=models.CharField(default='categories not enter', max_length=350),
        ),
    ]
