from django.urls import path
from .views import *

urlpatterns = [
  path('', UserView.as_view()),
  path('login/', LoginUserView.as_view()),
  path('register/', RegisterUserView.as_view()),
]