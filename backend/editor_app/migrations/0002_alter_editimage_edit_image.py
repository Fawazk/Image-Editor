# Generated by Django 4.1.5 on 2023-01-31 09:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='editimage',
            name='edit_image',
            field=models.ImageField(upload_to='images/editimage', validators=[django.core.validators.FileExtensionValidator(['jpeg'])]),
        ),
    ]
