from django.db import models
from django.utils.text import slugify
import datetime

class Jobs(models.Model):
    job_id = models.IntegerField(primary_key=True)
    company = models.TextField()
    title = models.TextField()
    url = models.TextField()
    location = models.TextField(blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_date = models.TextField(blank=True, null=True)
    scraping_date = models.DateField()
    sort_id = models.IntegerField(blank=True, null=True)
    privilege = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jobs'

    def __str__(self):
        return f'{self.company} - {self.title}'

    def get_slug(self):
        url = self.company + '-' + self.title + '-' + str(self.job_id)
        return slugify(url)
    
    def get_spaceless_title(self):
        return self.title.replace(' ', '%20')
    
    def is_old(self):
        return (self.scraping_date - datetime.date.today()).days < 7


class Users(models.Model):
    email = models.TextField(max_length=100,unique=True)
    location = models.TextField(max_length=50)
    level = models.TextField(max_length=50)
    remote = models.BooleanField()
    privilege = models.BooleanField(default=False)
    verification_code = models.IntegerField()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email
    

class BlockedEmailDomains(models.Model):
    domain = models.TextField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'blocked_email_domains'

    def __str__(self):
        return self.domain