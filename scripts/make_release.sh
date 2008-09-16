#!/bin/bash

# Script to create a "release" subdirectory.  This is a subdirectory
# containing a bunch of symlinks, from which the app can be updated.
# The main reason for this is to import Django from a zipfile, which
# saves dramatically in upload time: statting and computing the SHA1
# for 1000s of files is slow.  Even if most of those files don't
# actually need to be uploaded, they still add to the work done for
# each update.

DJANGO_ZIPFILE=django.zip
DEFAULT_APP_RELEASE=../release
DEFAULT_APP_FOLDER="../app"
DEFAULT_APP_FILES="app.yaml index.yaml __init__.py main.py settings.py urls.py"
DEFAULT_APP_DIRS="soc ghop gsoc feedparser tiny_mce"

APP_RELEASE=${APP_RELEASE:-"${DEFAULT_APP_RELEASE}"}
APP_FOLDER=${APP_FOLDER:-"${DEFAULT_APP_FOLDER}"}
APP_FILES=${APP_FILES:-"${DEFAULT_APP_FILES}"}
APP_DIRS=${APP_DIRS:-"${DEFAULT_APP_DIRS}"}

cd $APP_FOLDER
# Remove old $DJANGO_ZIPFILE file.
rm -rf $DJANGO_ZIPFILE

# Create new $DJANGO_ZIPFILE file.
# We prune:
# - .svn subdirectories for obvious reasons.
# - contrib/gis/ and related files because it's huge and unneeded.
# - *.po and *.mo files because they are bulky and unneeded.
# - *.pyc and *.pyo because they aren't used by App Engine anyway.
DJANGO_DIR="django"

zip -q $DJANGO_ZIPFILE `find $DJANGO_DIR \
    -name .svn -prune -o \
    -name gis -prune -o \
    -name admin -prune -o \
    -name localflavor -prune -o \
    -name mysql -prune -o \
    -name mysql_old -prune -o \
    -name oracle -prune -o \
    -name postgresql-prune -o \
    -name postgresql_psycopg2 -prune -o \
    -name sqlite3 -prune -o \
    -name test -prune -o \
    -type f ! -name \*.py[co] ! -name *.[pm]o -print`

# Remove old $APP_RELEASE directory.
rm -rf $APP_RELEASE

# Create new $APP_RELEASE directory.
mkdir $APP_RELEASE

# Create symbolic links.
for x in $APP_FILES $APP_DIRS $DJANGO_ZIPFILE
do
    #echo $APP_FOLDER/$x $APP_RELEASE/$x
    ln -s $APP_FOLDER/$x $APP_RELEASE/$x
done

echo "Release created in $APP_RELEASE."
