To install the dependencies

python3 setup.py develop

To reset and drop the database run:

sh reset_dev.sh 

This will  sync any new changes to the database and drop all the tables. It also adds 2 test users

To run the application server

sh runserver_dev.sh

This will automatically setup environment variables and the application will run with its DEV settings