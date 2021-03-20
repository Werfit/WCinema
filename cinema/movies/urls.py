from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register('halls', HallViewSet)
router.register('movies', MovieViewSet)
router.register('sessions', MovieSessionViewSet)

urlpatterns = router.urls