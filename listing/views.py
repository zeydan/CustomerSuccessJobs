from django.shortcuts import render
from django.http.response import HttpResponse
from django.http import HttpResponseRedirect
from .models import Jobs, Users, BlockedEmailDomains
from django.contrib import messages
from datetime import datetime
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
import hashlib



def index(request):
    jobs = Jobs.objects.all().order_by('-privilege', '-scraping_date', '-sort_id')[:11]
    return render(request, 'index.html', {
        'share_url' : 'https://customersuccess.jobs/',
        'page_title' : 'Customer Success Jobs Worldwide',
        'meta_description' : 'Customer Success Jobs is a job board to showcase related jobs worldwide. Updated daily. Job alerts included.',
        'load_more' : len(jobs) == 11,
        'jobs' : jobs[:10]
    })


def detail(request, slug):
    job_id = slug.split('-')[-1]
    job = Jobs.objects.get(job_id = job_id)
    page_title = f'{job.company} - {job.title}'
    return render(request, 'detail.html', {
        'share_url' : f'https://customersuccess.jobs/{slug}',
        'page_title' : page_title,
        'meta_description' : page_title,
        'job' : job
    })


def policy(request):
    return render(request, 'policy.html',{
        'share_url' : 'https://customersuccess.jobs/policy',
        'page_title' : 'Privacy Policy - Customer Success Jobs',
        'meta_description' : 'Privacy Policy - Customer Success Jobs'
    })


def terms(request):
    return render(request, 'terms.html', {
        'share_url' : 'https://customersuccess.jobs/terms',
        'page_title' : 'Terms of Use - Customer Success Jobs',
        'meta_description' : 'Terms of Use - Customer Success Jobs'
    })


def filter(request, slug):
    share_url = f'https://customersuccess.jobs/{slug}'
    page_title = slug.replace('-', ' ')
    is_remote = False
    remote = ''
    if slug.startswith('Remote'):
        remote = 'Remote'
        is_remote = True
        slug = slug[7:]
    
    slug = slug.split('Customer-Success-Jobs')

    level = ''
    if len(slug[0]) > 0:
        level = slug[0][:-1]

    location = ''
    meta_location = ''
    if len(slug[1]) > 0:
        location = slug[1][4:].replace('-', ' ')
        meta_location = f' Looking for a job in {location}?'

    company = request.GET.get('company', '')

    jobs = Jobs.objects.filter(title__icontains = level, location__icontains = location or remote, company__icontains = company).order_by('-privilege', '-scraping_date', '-sort_id')[:11]

    meta_description = f'Explore {page_title}.{meta_location} Updated daily. Job alerts included.';

    return render(request, 'index.html', {
        'share_url' : share_url,
        'page_title' : page_title,
        'meta_description' : meta_description,
        'location' : location,
        'company' : company,
        'level' : level,
        'remote' : is_remote,
        'load_more' : len(jobs) == 11,
        'jobs' : jobs[:10]
    })


def load_more(request):
    location = request.GET.get('location', '')
    company = request.GET.get('company', '')
    level = request.GET.get('level', '')
    remote = request.GET.get('remote', '')
    offset = int(request.GET.get('offset'))
    jobs = Jobs.objects.filter(title__icontains = level, location__icontains = location or remote, company__icontains = company).order_by('-privilege', '-scraping_date', '-sort_id')[offset:offset+11]
    return render(request, 'cards.html', {
        'load_more' : len(jobs) == 11,
        'jobs' : jobs[:10]
    })


def subscribe(request):
    if request.method == 'POST':
        email = request.POST['email']
        location = request.POST['location']
        level = request.POST['level']
        remote = request.POST.get('remote', False) == 'on'
        verification_code = int(round(datetime.now().timestamp()))

        if Users.objects.filter(email = email).exists():
            messages.error(request, 'This email address already exist on the system!')
            return HttpResponseRedirect('/')

        domain = email.split('@')[1]
        if BlockedEmailDomains.objects.filter(domain = domain).exists():
            messages.error(request, 'This email service provider is blacklisted! Try another email address.')
            return HttpResponseRedirect('/')

        user = Users.objects.create(email = email, location = location, level = level, remote = remote, verification_code = verification_code)
        user.save()
        
    id = user.pk
    send_email(email, id, verification_code)
    messages.success(request, 'Verification email has been sent to the email address. Please verify the email address.')
    return HttpResponseRedirect('/')


def send_email(email, id, verification_code):
    subject = 'Verify your email'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [f'{email}']
    html_content = render_to_string('verification_email.html', {
        'id' : id,
        'verification_code' : hashlib.md5(str(verification_code).encode()).hexdigest()
    })
    message = f'Please verify your email address in order to receive our weekly newsletters. Link: https://customersuccess.jobs/verify/{id}/{verification_code}'
    send_mail(subject = subject, message = message, html_message = html_content, from_email = email_from , recipient_list = recipient_list)


def verify(request, id, code):
    user = Users.objects.get(id = id)
    verification_code = user.verification_code
    if code == hashlib.md5(str(verification_code).encode()).hexdigest():
        user.privilege = True
        user.save()
        messages.success(request, 'Subscription is successful.')
        return HttpResponseRedirect('/')
    
    messages.error(request, 'There is an error! Please try again.')
    return HttpResponseRedirect('/')