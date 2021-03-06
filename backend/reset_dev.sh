     #!/bin/bash

    export DJANGO_DEV=1

    rm -rf tmp
    mkdir -p tmp

    

    python3 manage.py migrate --run-syncdb
    python3 manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.create_superuser('super_user', 'admin@example.com', '.');from rest_framework.authtoken.models import Token; Token.objects.create(user=u);"
    python3 manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.create_user('user', 'test@example.com', '.'); from rest_framework.authtoken.models import Token; Token.objects.create(user=u); from sportscred.models import Profile; Profile.objects.create(user=u);"   
    echo "Database resynched"
    
    echo "importing sports"
    python3 manage.py import_sports database_files/sports.yaml

    echo "importing profile"
    python3 manage.py import_profile database_files/profile.yaml

    echo "importing questionnaire"
    python3 manage.py import_questionnaire database_files/questionnaire.yaml

    echo "importing acshistory"
    python3 manage.py import_baseacshistory database_files/baseacshistory.yaml

    echo "importing debate"
    python3 manage.py import_debate database_files/debate.yaml

    echo "importing prediction"
    python3 manage.py import_prediction database_files/predictions.yaml


    if [ $# -gt 0 ]  
        then
        echo "importing trivia"
        python3 manage.py import_trivia database_files/trivia.yaml
        fi



