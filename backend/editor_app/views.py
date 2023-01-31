

from .serializers import EditImageSerializer
from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from .models import EditImage
# Create your views here.


class InterviewList(generics.ListCreateAPIView):

    parser_classes = (MultiPartParser, FormParser)
    serializer_class=EditImageSerializer
    queryset = EditImage

    def get(self, request):
        details = EditImage.objects.all()
        serializer = EditImageSerializer(details,many=True,context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print(request.data,'helooooooooooooooooooooo')
        posts_serializer = EditImageSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
