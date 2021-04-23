# API Middleman

# --- Healthcheck ---
## [GET] Healthcheck
Request :
- Method : GET
- Endpoint : `/api/healthcheck`
- Header :
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

# --- Credentials Section ---
## [POST] Register
Request :
- Method : POST
- Endpoint : `/api/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "username" : "string",
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

## [POST] Login
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
        "message" : "string",
        "token" : "string"
    }
}
```

## [DELETE] De-actived account
Request :
- Method : DELETE
- Endpoint : `/api/profile/de-actived`
- Header :
    - Authorization: "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body : 

```json
{
    "agree" : "boolean"
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

## [PUT] Change Password
Request :
- Method : PUT
- Endpoint : `/api/profile/edit/password`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "old_password" : "string",
   "new_password" : "string"
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
## [GET] Profile Info
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
        "is_admin" : "boolean",
        "circle_info" : {
           "cicle_name": "string",
           "total_member" : "number",
           "admin" : "boolean"
        }
    }
}
```

## [POST] Add Profile Picture
Request :
- Method : POST
- Endpoint : `/api/profile/upload/avatar`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: multipart/form-data
- Form-Data :
```
{
    "avatar" : "filelocation"
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


## [POST] Add Phone Number
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

## [POST] Add Address
Request :
- Method : POST
- Endpoint : `/api/profile/edit/address`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "address" : "text"
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
## [POST] Add Item
Request :
- Method : POST
- Endpoint : '/api/item/create'
- Header :
    - Authorization : "Bearer " + token
- Form Data: 
```json
{
    "name" : "string",
    "description" : "string",
    "image" : "@/home/wayan/Downloads/569b49f35215b9d6206bfe4bbbffba56.jpeg(string but file location)",
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

## [GET] Get all item
Request :
- Method : GET
- Endpoint : '/api/item/list'
- Header :
    - Authorization : "Bearer " + token

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string",
        "list_item" : [
            {
                "name" : "string",
                "stock" : "number",
                "price" : "number",
                "added_at" : "date"
            },
            {
                "name" : "string",
                "stock" : "number",
                "price" : "number",
                "added_at" : "date"
            }
        ]
    }
}
```

## [PUT] Update Item
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
    "image" : "string",
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

## [DELETE] Delete Item
Request :
- Method : DELETE
- Endpoint : `/api/item/delete`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

- Query param :
```json
{
    "id" : "number"
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


# --- Circle Section ---
## [POST] Create Circle
Request :
- Method : POST
- Endpoint : `/api/circle/create`
- Header :
    - Authorization : "Bearer " + token
- Form-Data :
    
```json 
{
    "name" : "string",
    "description" : "string",
    "circle_avatar" : "filelocation"
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

## [PUT] Edit Circle Info
Request :
- Method : PUT
- Endpoint : `/api/circle/edit`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "description" : "string"
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

## [PUT] Update Circle Avatar
Request :
- Method : POST
- Endpoint : `/api/circle/avatar/upload`
- Header :
    - Authorization : "Bearer " + token
- Form-Data :
    
```json 
{
    "circle_avatar" : "filelocation"
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

## [POST] Invite Member to Circle
Request :
- Method : POST
- Endpoint : `/api/circle/invite`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Query Param : 
```json
{
    "username" : "string"
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

## [GET] Get Circle Invitation
Request :
- Method : GET
- Endpoint : `/api/circle/invitation`
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
        "message" : "string",
        "invitation_list" : [
            {
                "circle_id" : "number",
                "circle_name" : "string",
                "circle_description" : "text",
                "circle_admin" : "string",
                "total_member" : "number",
                "founded_at" : "date"
            },
            {
                "circle_id" : "number",
                "circle_name" : "string",
                "circle_description" : "text",
                "circle_admin" : "string",
                "total_member" : "number",
                "founded_at" : "date"
            }
        ]
    }
}
```

## [GET] Get Circle Member
Request :
- Method : GET
- Endpoint : `/api/circle/member_list`
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
        "message" : "string",
        "member_list" : [
            {
                "id" : "number",
                "username" : "string",
                "avatar" : "string",
                "joined_at" : "date"
            },
            {
                "id" : "number",
                "username" : "string",
                "avatar" : "string",
                "joined_at" : "date"
            }
        ]
    }
}
```

## [PUT] Approve Circle Invitation
Request :
- Method : PUT
- Endpoint : `/api/circle/invitation/approve`
- Header :
    - Authorization : "Bearer " + token
    - Accept: application/json
- Query Param:
```
{
    "circle_id" : "number"
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

## [DELETE] Remove Member from Circle as Admin
Request :
- Method : DELETE
- Endpoint : `/api/circle/admin/remove`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Query Param : 
```
{
    "username" : "string"
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

## [GET] Quit Request from Member as Admin
Request :
- Method : GET
- Endpoint : `/api/circle/admin/remove_request`
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
        "message" : "string",
        "list_member" : [
            {
                "user_id" : "number",
                "username" : "string",
                "created_at" : "datetime"
            },
            {
                "user_id" : "number",
                "username" : "string",
                "created_at" : "datetime"
            }
        ]
    }
}
```

## [DELETE] Quit from Circle
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

## [GET] Get Circle's Bonus Scheme
Request :
- Method : GET
- Endpoint : `/api/circle/bonus`
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
        "message" : "string",
        "bonus_scheme" : {
            "to_admin" : "number",
            "to_member" : "number",
            "created_at" : "datetime",
            "updated_at" : "datetime"
        }
    }
}
```

## [POST] Create Circle's Bonus Scheme
Request :
- Method : POST
- Endpoint : `/api/circle/bonus/edit`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "to_admin" : "number",
    "to_member" : "number"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string",
        "bonus_scheme" : {
            "to_seller" : "number",
            "to_member" : "number"
        }
    }
}
```

# --- Shipping Section ---
## [GET] Get Shipping Cost
Request :
- Method : GET
- Endpoint : `/api/shipping/cost`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    - *Available shipping service : ["JNE", "TIKI", "POS"] *pick 1
```json 
{
    "origin" : "number",
    "destination" : "number",
    "weight" : "number",
    "courier" : "string"
}
```

Response :
```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : [
            {
                "code": "jne",
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "costs": [
                    {
                        "service": "OKE",
                        "description": "Ongkos Kirim Ekonomis",
                        "cost": [
                            {
                                "value": 35000,
                                "etd": "3-4",
                                "note": ""
                            }
                        ]
                    },
                    {
                        "service": "REG",
                        "description": "Layanan Reguler",
                        "cost": [
                            {
                                "value": 38000,
                                "etd": "2-3",
                                "note": ""
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

## [GET] Get Mapping Address
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
## [POST] Order Item
Request :
- Method : POST
- Endpoint : `/api/order`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "buyer_id" : "number",
    "seller_id" : "number",
    "shipping_address" : "text",
    "item_list" : [
        {
            "item_id" : "number",
            "notes" : "text",
            "price" : "number",
            "quantity" : "number",
            "weight" : "number"
        },
        {
            "item_id" : "number",
            "notes" : "text",
            "price" : "number",
            "quantity" : "number",
            "weight" : "number"
        }
    ],
    "shipping_price" : "number",
    "total_price" : "number"
}
```

## [GET] Get Orders waiting for approval as Admin
Request :
- Method : GET
- Endpoint : `/api/order/admin/orders`
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
        "message" : "string",
        "orders" : [
            {
                "id" : "number",
                "buyer_id" : "number",
                "seller_id" : "number",
                "item_list" : [
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    },
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    }
                ]
            },
            {
                "id" : "number",
                "buyer_id" : "number",
                "seller_id" : "number",
                "item_list" : [
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    },
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    }
                ]
            }
        ]
    }
}
```

## [GET] Get Orders waiting for approval as Seller
Request :
- Method : GET
- Endpoint : `/api/order/seller/orders`
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
        "message" : "string",
        "orders" : [
            {
                "id" : "number",
                "buyer_id" : "number",
                "item_list" : [
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    },
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    }
                ]
            },
            {
                "id" : "number",
                "buyer_id" : "number",
                "item_list" : [
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    },
                    {
                        "item_id" : "number",
                        "item_name" : "string",
                        "price" : "number",
                        "quantity" : "number"
                    }
                ]
            }
        ]
    }
}
```

## [PUT] Approve Order from list as Admin
Request :
- Method : PUT
- Endpoint : `/api/order/admin/approve?order_id={number}&value={boolean}`
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

## [PUT] Approve Order from list as Seller
Request :
- Method : PUT
- Endpoint : `/api/order/seller/approve?order_id={number}&value={boolean}`
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

# --- Bank Section ---