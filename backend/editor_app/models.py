from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.


class EditImage(models.Model):
    edit_image = models.ImageField(upload_to='images/editimage',validators=[FileExtensionValidator(['jpeg'])])
    