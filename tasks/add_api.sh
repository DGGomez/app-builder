#!/bin/bash
# file and line manipulation of api for (mongo, mysql, or none)
# move into folder name
cd $2

move basic $2

# mongo
if [ $1 == 2 ]
then
  move /mongodb/controllerMongo.js $2/basic/controller/dataController.js
  move /mongodb/dataModel.js $2/basic/model/dataModel.js

# mysql
elif [ $1 == 1 ]
then
 move /mysql/controllerMysql.js $2/basic/controller/dataController.js
 move /mysql/db.js $2/basic/db/db.js
 
# none
else

fi
