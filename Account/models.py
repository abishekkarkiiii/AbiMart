from django.db import models

class UserAccount(models.Model):
    username = models.CharField(max_length=100)
    phone = models.CharField(max_length=15,default="")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role=models.CharField(max_length=500,default="")
    def __str__(self):
        return self.username
