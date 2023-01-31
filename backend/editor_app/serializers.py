

from rest_framework import serializers
from .models import EditImage

class EditImageSerializer(serializers.ModelSerializer):
    edit_image= serializers.ImageField(max_length=None,use_url=True)
    class Meta:
        model = EditImage
        fields = "__all__"