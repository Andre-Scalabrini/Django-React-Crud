from django.db import models

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=200)
    department = models.CharField(max_length=350)

    def __str__(self):
        return self.name