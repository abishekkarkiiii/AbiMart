from Product.models import  Product_Table as pr
from django.http import HttpResponse
from django.shortcuts import render,redirect
from Account.UserAccount import UserAccount
from django.http import JsonResponse
import os
import uuid
from PIL import Image
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
import os
# def create_products(request):
#     pr(
#        product_name=request.POST.get('productname'),
#        details=request.POST.get('details'),
#        price=int(request.POST.get('price')),
#        username=request.user.username,
#        name=UserAccount.objects.get(email=request.user.username)
#       #  image=request.POST.get('image')
#     ).save()

#     return redirect('/account/')




def create_categories_image(request):
    if request.method == 'POST':
        image_file = request.FILES.get('productImage')  # Get the uploaded file

        if not image_file:
            return JsonResponse({'status': 'error', 'message': 'No image uploaded'}, status=400)
        
        # Fetch category and dynamically set the directory
        category = request.POST.get('categories')
        base_dir = r"C:\Projects\PythonProjects\Grocery\static\productimages"
        
        
        if not category:
            return JsonResponse({'status': 'error', 'message': 'Category not specified'}, status=400)
        
        # Define the directory based on the category
        custom_dir = os.path.join(base_dir, category)
        
        # Ensure the directory exists
        os.makedirs(custom_dir, exist_ok=True)
        
        # Create a unique file name
        unique_filename = f"{uuid.uuid4().hex}_{image_file.name}"
        save_path = os.path.join(custom_dir, unique_filename)
        
        # Resize the image
        try:
            img = Image.open(image_file)
            img = img.resize((195, 210), Image.Resampling.LANCZOS)  # Resize with high-quality filtering
            img.save(save_path)  # Save the resized image
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f"Image processing failed: {str(e)}"}, status=500)
        
        # Save product details in the database
        try:
            pr.objects.create(
                product_name=request.POST.get('productname'),
                details=request.POST.get('details'),
                price=float(request.POST.get('price')),
                username=request.user.username,
                name=UserAccount.objects.get(email=request.user.username),
                image=f'/static/productimages/{category}/{unique_filename}',  # Path to access the image
                categories=category,
                unique_name=unique_filename
            )
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f"Database save failed: {str(e)}"}, status=500)
        
        # Redirect after successful operation
        return redirect('/account/')
    
    # Handle invalid request methods
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)



#to get all product in market
def get_product(request):  
     products = pr.objects.all()
    # Serialize the products to JSON
     product_list = list(products.values())
     print(product_list)
     return JsonResponse(product_list)
    
from django.http import JsonResponse
from django.conf import settings

@login_required(login_url='/login/')
def get_categories(request):
    # Get the category filter from the request
    whatIsIt = request.GET.get('categories', '')  # Get category from the URL parameter
    
    # Query the Product_Table based on the category
    products = pr.objects.filter(categories=whatIsIt)
    
    # Create a list of dictionaries to store product details
    product_list = []
    for product in products:
        # Assuming images are stored with the image name in the database
        # img_url = f"{settings.MEDIA_URL}{product.image}" if product.image else ''
        
        # Construct product data in a dictionary
        product_data = {
            'product_name': product.product_name,
            'details': product.details,
            'image': product.image,  # If image is available, append the complete URL
            'price': product.price,
            'username': product.username,
            'name': product.name,
            'categories': product.categories,
            
        }
        
        product_list.append(product_data)
    
    if whatIsIt =="Bakery_items":
         whatIsIt="Bakery"
    elif whatIsIt=="readytoeat":
         whatIsIt="Ready TO Eat"
    elif whatIsIt=="Dairy":
        whatIsIt="Dairy Products"

    
        

 # Render the page and pass product list to template
    return render(request, 'category.html', {
        'name':whatIsIt , 
        'products': product_list
    })


def product_delete(request):

    if request.method == 'POST':
        id = json.loads(request.body).get('id')
        pr.objects.filter(id=id).delete()
        return redirect('/account/')
    return redirect('/account/')


@csrf_exempt
def product_update(request):
    if request.method == 'POST':
        try:
            # Get product first
            product = pr.objects.get(id=request.POST.get('id'))
            
            # Update basic fields
            product.product_name = request.POST.get('name')
            product.details = request.POST.get('details')
            product.price = request.POST.get('price')
            
            # Handle image upload if present
            if 'image' in request.FILES:
                image_file = request.FILES['image']
                category = product.categories
                base_dir = r"C:\Projects\PythonProjects\Grocery\static\productimages"
                custom_dir = os.path.join(base_dir, category)
                os.makedirs(custom_dir, exist_ok=True)
                unique_filename = f"{uuid.uuid4().hex}_{image_file.name}"
                save_path = os.path.join(custom_dir, unique_filename)
                imagename=product.unique_name
                
                try:
                 
                    with Image.open(image_file) as img:
                        img = img.resize((195, 210), Image.Resampling.LANCZOS)
                        img.save(save_path)
                    
                    relative_path = f"/static/productimages/{category}/{unique_filename}"
                    product.image = relative_path
                    
                except Exception as e:
                    return JsonResponse({
                        'success': False,
                        'message': f"Image processing failed: {str(e)}"
                    }, status=500)
            
            product.save()
            file_path = f'C:/Projects/PythonProjects/Grocery/static/productimages/{category}/{imagename}'  # Replace with the correct path
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"{file_path} deleted successfully.")
            else:
                print(f"{file_path} not found.")

            return JsonResponse({
                'success': True,
                'message': 'Product updated successfully'
            })
            
        except pr.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Product not found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=405)

@csrf_exempt
def product_get_all_products_UploadedByUser(request):
    print("nothing")
    print(request.user.username+"user")
    products = pr.objects.filter(username=request.user.username)[:10]
    product_list = list(products.values('id', 'product_name', 'details', 'image', 'price', 'username', 'name', 'categories'))
    return JsonResponse(product_list,safe=False)

@login_required(login_url='/login/')
def edit_product(request):
 return render(request, 'edit_product.html')






