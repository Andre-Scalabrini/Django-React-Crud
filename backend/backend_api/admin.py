from django.contrib import admin
from .models import Employee
# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    list = ('name', 'email', 'department')

    admin.site.register(Employee)