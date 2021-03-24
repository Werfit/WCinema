from rest_framework import routers
from django.urls import path
from .views import *

router = routers.DefaultRouter()

router.register('halls', HallViewSet)
router.register('movies', MovieViewSet)
router.register('sessions', MovieSessionViewSet)

urlpatterns = router.urls + [ path('tickets/', TicketsView.as_view()) ]