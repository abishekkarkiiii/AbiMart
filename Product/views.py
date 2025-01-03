from django.shortcuts import render# type: ignore
from django.http import HttpResponse# type: ignore
from django.conf import settings# type: ignore
from django.conf.urls.static import static # type: ignore
from django.contrib.auth.decorators import login_required
from Account.models import UserAccount
from Product.models import  Product_Table 
# Create your views here.


def home(request):
    products = Product_Table.objects.order_by('?')[:30]
    product_list=[]
    for product in products:
          product_data = {
            'product_name': product.product_name,
            'details': product.details,
            'image': product.image,  # If image is available, append the complete URL
            'price': product.price,
            'username': product.username,
            'name': product.name,
            'categories': product.categories,
        }
          
         
    return HttpResponse(render(request,'index.html',{'products':products}))



@login_required(login_url='/login/')
def shop(request):
    # print(f"User is authenticated: {request.user.is_authenticated}")
     products = Product_Table.objects.order_by('?')[:30]
     product_list=[]
     for product in products:
          product_data = {
            'product_name': product.product_name,
            'details': product.details,
            'image': product.image,  # If image is available, append the complete URL
            'price': product.price,
            'username': product.username,
            'name': product.name,
            'categories': product.categories,
            'id':product.id,
        }
     return HttpResponse(render(request, 'shop.html',{'products':products}))

@login_required(login_url='/login/')
def register_product(request):
     user=request.user
     isvendor = UserAccount.objects.get(email=user.username) 
     if isvendor is not None:
                print("user is available")
                if isvendor.role =="vendor":
                   return render(request, 'productregister.html')
                else:
                 return HttpResponse(render(request, 'login.html'))
                
     return HttpResponse(render(request, 'login.html'))
     
    



