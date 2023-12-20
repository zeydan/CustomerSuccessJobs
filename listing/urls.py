from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('policy', views.policy, name='policy'),
    path('terms', views.terms, name='terms'),
    path('detail/<slug:slug>', views.detail, name='detail'),
    path('subscribe', views.subscribe, name='subscribe'),
    path('verify/<int:id>/<str:code>', views.verify),
    path('load_more', views.load_more, name='load_more'),
    path('<slug:slug>', views.filter)
]