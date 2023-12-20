from django.contrib import admin
from .models import Jobs, Users, BlockedEmailDomains

admin.site.register(Jobs)
admin.site.register(Users)
admin.site.register(BlockedEmailDomains)