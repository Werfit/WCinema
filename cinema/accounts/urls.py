from django.urls import path
from .views import *

urlpatterns = [
  path('login/', LoginUserView.as_view()),
  path('register/', RegisterUserView.as_view()),
  path('logout/', LogoutUserView.as_view()),
  path('user/', UserView.as_view())
]