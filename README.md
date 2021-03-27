# Kakulator

[Kakulator](https://kakulator.herokuapp.com/) is a Django application, which uses cutting-edge mathematical software to satisfy all your kakulation needs.


### Installation guide
#### Python & dependencies
Kakulator uses python 3.9.2. It is highly recommended to use a virtual environment, such as [pyenv](https://github.com/pyenv/pyenv).

 Create a new virtual environment and install all the required packages with the following commands:
```
pyenv install 3.9.2
pyenv virtualenv 3.9.2 kakulator
pyenv activate kakulator
pip install -r requirements/local.txt
```

#### Environment variables
Create a copy of the `.env.tmpl` file and name it `.env`. Then you need to set the variables in the `.env` file to something like:
```
SECRET_KEY=<whatever_string_you_want>

PROJECT_NAME=Kakulator
PROJECT_URL=https://127.0.0.1:8880
PROJECT_VERSION=0.1.0-dev

DB_NAME=kakulator
DB_USER=<your_db_superuser_scheme>
DB_PASS=<password>
DB_HOST=localhost
DB_PORT=5432
DB_ATOMIC_REQUESTS=False
```

#### Database
Kakulator uses PostgreSQL 13 (but versions not older than 10 should also work).

Install PostgreSQL on your system, if you haven't already (the following command works on Ubuntu/Debian):
```
sudo apt install postgresql-13 postgresql-client-13
```

Create a new database for Kakulator:
```
sudo su - postgres -c psql <<< "create database kakulator with owner <your_db_superuser_scheme>;"
```

Before you run the Kakulator server, you need to apply database migrations with the following command:
```
./manage.py migrate
```

There is also a handy script when you need to drop the database and create it again from scratch
```
./recreate_db.sh
```

#### Django settings
Create a copy of the `conf/settings/local.tmpl.py` file and name it `conf/settings/local.py`. At this point, you shouldn't have to alter the local settings further.

### Running the server
Use the following command to run the Kakulator server:
```
DJANGO_SETTINGS_MODULE=conf.settings.local ./manage.py runserver_plus 8880 --cert-file certs/localhost.crt
```
You can also run it from your IDE. This is an example configuration in PyCharm:
![image](https://user-images.githubusercontent.com/48059207/111070372-c4387e00-84d1-11eb-990c-01636fa12b5e.png)

Then just open your favourite web browser, go to https://127.0.0.1:8880 and enjoy your kakulations!
