#!/bin/bash

for APP_DIR in $(ls apps); do
  MIGRATIONS_DIR=apps/$APP_DIR/migrations
  ls $MIGRATIONS_DIR/ | grep -v __init__.py | xargs -I {} rm $MIGRATIONS_DIR/{} 2>/dev/null
done

exit 0
