# Generated by Django 5.0.6 on 2024-08-31 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roll_number', models.IntegerField()),
                ('student_name', models.CharField(max_length=20)),
                ('education', models.CharField(max_length=20)),
                ('college', models.CharField(max_length=20)),
            ],
        ),
    ]
