## test for api/pools endpoints

# route /

## GET
curl http://localhost:3000/api/pools

## POST 

### correct
curl -X POST -H "Content-Type: application/json" -d '{ "name": "user1", "creator": "5b4e53177a572a262c82cb19", "options": [{ "id": 1, "value": "option1" }, { "id": 2, "value": "option2" }] }' http://localhost:3000/api/pools

### not correct
curl -X POST -H "Content-Type: application/json" -d '{ "name": "user1", "creator": "5b4e53177a572a262c82cb19", "options": [{ "id": 0, "value": "option1" }, { "id": 2, "value": "option2" }] }' http://localhost:3000/api/pools

# -------------

# route /:poolId

## GET
curl http://localhost:3000/api/pools/5b4e53177a572a262c82cb18

## DELETE
-X DELETE curl http://localhost:3000/api/pools/5b579273fe57f02becf0b0e5

# ------------

# route /:poolId/votes

## PATCH
curl -X PATCH -H "Content-type: application/x-www-form-urlencoded" -d "optionId=1" http://localhost:3000/api/pools/5b4e53177a572a262c82cb18/votes

# ------------

# route /:poolId/followers

## PATCH
# curl -X PATCH -H "Content-type: application/x-www-form-urlencoded" -d "followerId=???" http://localhost:3000/api/pools/5b4e53177a572a262c82cb18/followers

# ------------

# route /:poolId/followers/:followerId

## DELETE
# curl -X DELETE http://localhost:3000/api/pools/5b4e53177a572a262c82cb18/followers/:followerId

# ------------

# route /:poolId/options

## PATCH
curl -X PATCH -H "Content-type: application/json" -d '{ "id": 18, "value": "new option" }' http://localhost:3000/api/pools/5b4e53177a572a262c82cb18/options

# ------------

# route /:poolId/options/:optionId

## DELETE
curl -X DELETE http://localhost:3000/api/pools/5b4e53177a572a262c82cb18/options/18