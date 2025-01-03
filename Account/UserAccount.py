from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.shortcuts import render
# from .models import UserAccount  # Assuming your custom user model is called UserAccount
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from Account.models import UserAccount
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


@login_required(login_url='/login/')
def useraccount_dashboard(request):
    user = request.user  # Get the logged-in user
    try:
        # Get the corresponding UserAccount
        isvendor = UserAccount.objects.get(email=user.username) 
        if isvendor:
            print(isvendor.role)
            print("User is available")
            if isvendor.role == "vendor":
                return render(request, 'VendorAccountdashBoard.html', {'username': isvendor.username,'email':isvendor.email})
            else:
                return render(request, 'AccountDashboard.html', {'username':isvendor.username,'email':isvendor.email})
    except UserAccount.DoesNotExist:
        # Handle case where UserAccount is not found
        return HttpResponse("User account does not exist.")
  





def logout_view(request):
    # Log out the user
    logout(request)
    # Redirect to the login page or home page after logout
    return redirect('/login/')