from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

from datetime import timedelta
from django.utils import timezone
from django.conf import settings

from .models import *

# Checks if token is expired
def is_token_expired(token):
  time_elapsed = timezone.now() - token.created
  left_time = timedelta(seconds=settings.TOKEN_EXPIRES_AFTER_SECONDS) - time_elapsed

  return left_time < timedelta(seconds=0)

# Checks if token is expired due to inactivity
def is_token_inactive(token):
  time_elapsed = timezone.now() - token.last_action
  left_time = timedelta(seconds=settings.INACTIVE_TOKEN_EXPIRES_AFTER_SECONDS) - time_elapsed

  return left_time < timedelta(seconds=0)

# Deletes token if it's expired or returns that token is not expired
def token_expiration_handler(token, cb):
  is_expired = cb(token)

  if is_expired:
    token.delete()
    token = ExpiringToken.objects.create(user=token.user)

  return is_expired, token

# Overriding Token Authentication
class ExpiringTokenAuthentication(TokenAuthentication):
  def authenticate_credentials(self, key):
    try:
      token = ExpiringToken.objects.get(key=key)
    except ExpiringToken.DoesNotExist:
      raise AuthenticationFailed("Invalid Token")

    if not token.user.is_active:
      raise AuthenticationFailed("User is not active")

    is_expired, token = token_expiration_handler(token, is_token_expired)

    if is_expired:
      raise AuthenticationFailed("The Token is expired")

    if not token.user.is_staff:
      is_expired, token = token_expiration_handler(token, is_token_inactive)

      if is_expired:
        raise AuthenticationFailed("The Token is expired due to inactivity")

    token.last_action = timezone.now()
    token.save()

    return token.user, token