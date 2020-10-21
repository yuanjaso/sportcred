     

    #!/bin/bash

    export DJANGO_DEV=1

    rm -rf tmp
    mkdir -p tmp

    python3 manage.py migrate --run-syncdb
    python3 manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('poop', 'admin@example.com', '.')"
    python3 manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.create_user('bbb', 'test@example.com', '.'); from rest_framework.authtoken.models import Token; Token.objects.create(user=u); from sportscred.models import Profile; Profile.objects.create(user=u);"   
    python3 manage.py import_questionnaire database_files/questionnaire.yaml 
    python3 manage.py import_sports database_files/sports.yaml




