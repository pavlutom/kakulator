from django.conf import settings


def project(request):
    return {
        "PROJECT_NAME": settings.PROJECT_NAME,
        "PROJECT_URL": settings.PROJECT_URL,
        "PROJECT_VERSION": settings.PROJECT_VERSION,
    }
