# Generated by Django 5.1.3 on 2025-01-04 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0003_product_table_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='product_table',
            name='unique_name',
            field=models.TextField(default=''),
        ),
    ]
