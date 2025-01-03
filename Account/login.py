from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
# from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from Account.models import UserAccount

def login_view(request):
    if request.method == 'POST':
        # Get email and password from the form
        email = request.POST.get('username')  # Email is used for authentication
        password = request.POST.get('password')
        
        # Authenticate user
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Login the user
            login(request, user)
            # isvendor = UserAccount.objects.get(email=email) 
            # if isvendor is not None:
            #     if isvendor.role =="vendor":
            #        return render(request, 'productregister.html')
            #     else:
            return redirect('/shop/') 

             # Replace 'home' with your actual home view name
        else:
            # Authentication failed
            return render(request, 'login.html', {'error': 'Invalid credentials'})

    # Render the login page
    return render(request, 'login.html')

# A sample home view for logged-in users
@login_required(login_url='/login/')
def home_view(request):
    return render(request, 'index.html')


def resgister_view(request):
    return render(request, 'register.html')

