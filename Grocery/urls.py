"""
URL configuration for Grocery project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from Account.login import login_view,resgister_view
from Account.views import create_account
from Account.login import home_view
from Account.UserAccount import useraccount_dashboard,logout_view
from django.shortcuts import render, redirect
from Product.productslogic import get_categories
from Grocery.main import getlocation
# from Account.login import home_view



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('Product.urls'),name='home'),
    path('shop/',include('Product.urls')),
    path('account/',useraccount_dashboard),
    path('register/',resgister_view),
    path('buy/',include('Product.urls')),
    path('createaccount/',create_account),
    path('login/',login_view),
    path('logout/',logout_view),
    path('categories/',get_categories),
    path('getlocation/',getlocation),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

LOGIN_URL = '/login/'

AUTH_USER_MODEL = 'Account.CustomUser'
AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend']