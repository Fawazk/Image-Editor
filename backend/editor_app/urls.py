
from django.urls import path,include
from . import views

urlpatterns = [    
    path('posts/', views.InterviewList.as_view(), name= 'posts_list'),
]