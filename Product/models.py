from django.db import models

# Create your models here.

class Product_Table(models.Model):
    product_name = models.CharField(max_length=200)
    details = models.TextField()
    image = models.TextField()
    price = models.IntegerField(default=0)
    username=models.CharField(max_length=100,default="")
    name=models.CharField(max_length=200,default="name was not enter")
    categories=models.CharField(max_length=350,default="categories not enter")
    unique_name=models.TextField(default="")
    



    def __str__(self):
        return self.product_name

