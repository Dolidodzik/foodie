# Generated by Django 2.2.2 on 2019-07-02 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0003_auto_20190702_1903'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cached_Gallery',
            fields=[
                ('place_id', models.CharField(default=None, max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Cached_Image',
            fields=[
                ('reference', models.CharField(default=None, max_length=255, primary_key=True, serialize=False)),
                ('image_file', models.ImageField(default='defaults/default.png', upload_to='cached_images')),
                ('gallery', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='app.Cached_Gallery')),
            ],
        ),
    ]