     

    #!/bin/bash

    export DJANGO_DEV=1

    rm -rf tmp
    mkdir -p tmp

    python3 manage.py migrate --run-syncdb
    python3 manage.py import_questionnaire database_files/questionnaire.yaml 
    python3 manage.py import_sports database_files/sports.yaml


