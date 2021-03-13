from django.urls import path
from .views import *

urlpatterns = [
  path('user/<int:pk>/', UserView.as_view()),
  path('login/', LoginUserView.as_view()),
  path('register/', RegisterUserView.as_view()),
  path('logout/', LogoutUserView.as_view())
]