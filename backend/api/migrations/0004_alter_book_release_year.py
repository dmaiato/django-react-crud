# Generated by Django 5.2.3 on 2025-06-23 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_book_release_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='release_year',
            field=models.IntegerField(default=1),
        ),
    ]
