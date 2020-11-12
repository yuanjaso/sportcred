To install the dependencies

pip3 install -r requirements.txt
To reset and drop the database run:

sh reset_dev.sh 

This will  sync any new changes to the database and drop all the tables. It also adds 2 test users. 

By default this won't import any trivia data. Theres alot of trivia data and takes a while to import.
If you do want to import the trivia data the command install

sh reset_dev.sh -t

To run the application server

sh runserver_dev.sh

This will automatically setup environment variables and the application will run with its DEV settings