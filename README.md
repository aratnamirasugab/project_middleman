# API Middleman
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
        "message" : "string"
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

## [POST] Change Password
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


# --- Item Section ---
## [POST] Add Item
Request :
- Method : POST
- Endpoint : `/api/item/create`
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
## [POST] Create Circle
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

## [POST] Upload Circle Avatar
Request :
- Method : POST
- Endpoint : `/api/circle/avatar/upload`
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

## [POST] Add Member to Circle
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

## [DELETE] Remove Member from Circle as Admin
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