# from django.contrib.auth.models import User
# from django.contrib.auth.backends import ModelBackend

# class EmailBackend(ModelBackend):
#     def authenticate(self, request, username=None, password=None, **kwargs):
#         try:
#             # Attempt to find the user by email (username is being treated as the email)
#             user = User.objects.get(email=username)  # Use email for authentication
#             if user.check_password(password):  # Check if the password matches
#                 return user
#         except User.DoesNotExist:
#             return None  # Return None if user does not exist
