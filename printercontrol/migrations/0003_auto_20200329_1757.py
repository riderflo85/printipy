# Generated by Django 3.0.4 on 2020-03-29 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printercontrol', '0002_printer_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='printer',
            name='status',
            field=models.CharField(default='Non connectée', max_length=13),
        ),
    ]
