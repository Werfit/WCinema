from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register('halls', HallViewSet)
router.register('sessions', MovieViewSet)

urlpatterns = router.urls