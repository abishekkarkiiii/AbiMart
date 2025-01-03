from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.shortcuts import render
# from .models import UserAccount  # Assuming your custom user model is called UserAccount
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from Account.models import UserAccount
def create_account(request):
    
    if request.method == 'POST':
        # Get input values by 'name' attribute
        username = request.POST.get('username')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Hash the password before saving
        hashed_password = make_password(password)

        # Create the user object with hashed password
        user = User(
            username=email,
            # phone=phone,
            email=email,
            password=hashed_password
        )

        if user is not None:
             UserAccount(
                 email=email,
                 role="",
                 phone=phone,
                 username=username   
             ).save()
             user.save()

        # Return a success message (you might want to redirect to a login page)
        return  render(request,'index.html')

    return render(request, 'register.html')


