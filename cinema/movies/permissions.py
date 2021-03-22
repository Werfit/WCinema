from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.contrib.auth.models import User

class IsAuthenticatedAndNotAdminUser(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_authenticated and not request.user.is_staff


class IsAdminOrReadOnly(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_staff or request.method in SAFE_METHODS