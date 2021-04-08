# API Middleman
#
#
#
#
#
# --- Credentials Section ---
## Register
Request :
- Method : POST
- Endpoint : `/api/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Login
Request :
- Method : POST
- Endpoint : `/api/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## De-actived account
Request :
- Method : DELETE
- Endpoint : `/api/profile/de-actived`
- Header :
    - Authorization: "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Change Password
Request :
- Method : POST
- Endpoint : `/api/profile/edit/password`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "old_password" : "string",
   "new_password" : "string",
   "confirm_new_password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

# --- User Section ---
## Get Profile Info
Request :
- Method : GET
- Endpoint : `/api/profile`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "name" : "string",
         "avatar" : "string",
         "joined_on" : "string",
         "email" : "string",
         "admin" "boolean",
         "circle_info" : {
             [
                "cicle_name": "string",
                "total_member" : "number",
                "admin" : "boolean"
             ]
         }
     }
}
```

## Add Profile Picture
Request :
- Method : POST
- Endpoint : `/api/profile/upload/avatar`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "avatar" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```


## Add Phone Number
Request :
- Method : POST
- Endpoint : `/api/profile/edit/phone_number`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "phone_number" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```


# --- Item Section ---
## Add Item
Request :
- Method : POST
- Endpoint : `/api/item`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
    "description" : "string",
    "image" "string",
    "quantity" : "number",
    "price" : "number"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Update Item
Request :
- Method : PUT
- Endpoint : `/api/item?id={number}/edit'
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
    "description" : "string",
    "image" "string",
    "quantity" : "number",
    "price" : "number"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Delete Item
Request :
- Method : DELETE
- Endpoint : `/api/item?id={number}`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
    
Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```


# --- Circle Section ---
## Create Circle
Request :
- Method : POST
- Endpoint : `/api/circle/create`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
    "description" : "string",
    "circle_avatar" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Edit Circle Info
Request :
- Method : PATCH
- Endpoint : `/api/circle/edit`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
    "description" : "string",
    "circle_avatar" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Add Member to Circle
Request :
- Method : POST
- Endpoint : `/api/circle/invite?username={string}`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Remove Member from Circle as Admin
Request :
- Method : DELETE
- Endpoint : `/api/circle/remove?username={string}`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Quit from Circle
Request :
- Method : DELETE
- Endpoint : `/api/circle/quit`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

# --- Shipping Section ---
## Get Shipping Cost
Request :
- Method : GET
- Endpoint : `/api/shipping/fee`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "origin" : "string",
    "destination" : "string",
    "weight" : "number",
    "courier" : ["jne", "tiki", "pos"] *pick 1
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

## Get Mapping Address
Request :
- Method : GET
- Endpoint : `/api/shipping/address`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
         "message" : "string"
     }
}
```

# --- Order Section ---