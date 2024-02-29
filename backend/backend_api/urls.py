from backend_api.views import EmployeeViewSet
from rest_framework.routers import DefaultRouter
from backend_api import views

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employee')
urlpatterns = router.urls
