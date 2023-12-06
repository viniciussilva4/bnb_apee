from django.contrib import admin
from django.urls import path, include
from apee.urls import urlpatterns as apee_urls


urlpatterns = [

    path('apee/', include(apee_urls)),
    
    path('admin/', admin.site.urls),
]