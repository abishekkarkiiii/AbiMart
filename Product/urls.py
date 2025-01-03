from django.urls import path
from Product.views import home
from Product.views import shop
from django.conf import settings
from django.conf.urls.static import static
from Product.views import register_product
from Product.productslogic import create_categories_image,product_delete,product_get_all_products_UploadedByUser,edit_product,product_update

urlpatterns = [
    path('',home),
    path('shop/',shop),
    path('home/',home),
    path('registerproduct/',register_product),
    path('upload_product/',create_categories_image),
    path('delete_product/',product_delete),
    path('all_productsByUser/',product_get_all_products_UploadedByUser),
    path('Edit/',edit_product),
    path('update_product/',product_update),


   
     
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

