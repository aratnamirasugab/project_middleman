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
    "code": 200,
    "status": "OK",
    "data": {
        "user_data": {
            "username": "bagus",
            "avatar": null,
            "registered_on": "2021-06-30T08:10:13.000Z",
            "is_admin": 0,
            "email": "bagus@gmail.com",
            "circle_info": {
                "cicle_name": "Circle owen lesil",
                "total_member": 1,
                "admin": 0
            }
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

## [GET] Get profile picture
Request :
- Method : GET
- Endpoint : `/api/profile/download/avatar/:name`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

``Downloadable file```

or

```json 
{
    "code" : "500",
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
    "item-picture" : "@/home/wayan/Downloads/569b49f35215b9d6206bfe4bbbffba56.jpeg(string but file location)",
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
    "code": 200,
    "status": "OK",
    "data": {
        "message": "Successfully pull item list",
        "list_item": [
            {
                "id": 3,
                "name": "Remote AC",
                "stock": 10,
                "price": 30000,
                "added_at": "2021-07-01T01:49:18.000Z",
                "item_picture": "http://localhost:3000/api/item/download/picture/34-item-2021-06-15-112457.jpg"
            },
            {
                "id": 4,
                "name": "Remote AC",
                "stock": 10,
                "price": 30000,
                "added_at": "2021-07-01T01:49:48.000Z",
                "item_picture": "http://localhost:3000/api/item/download/picture/34-item-2021-06-15-112457.jpg"
            },
            {
                "id": 5,
                "name": "Remote AC",
                "stock": 10,
                "price": 30000,
                "added_at": "2021-07-01T01:52:02.000Z",
                "item_picture": "http://localhost:3000/api/item/download/picture/34-item-2021-06-15-112457.jpg"
            }
        ]
    }
}
```

## [GET] Get item picture
Request :
- Method : GET
- Endpoint : `/api/item/download/picture/:name`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

``Downloadable file```

or

```json 
{
    "code" : "500",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

## [PUT] Update Item
Request :
- Method : PUT
- Endpoint : `/api/item/edit/:id'
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: form-data
- Form-Data :
    
```json 
{
    "id" : "number",
    "name" : "string",
    "description" : "string",
    "item-picture" : "string to file location",
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
    "circle-avatar" : "filelocation"
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

## [GET] Get Circle's Info
Request :
- Method : GET
- Endpoint : `/api/circle`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code": 200,
    "status": "OK",
    "data": {
        "circle_data": {
            "circle": {
                "id": 11,
                "name": "test circle 1",
                "description": "hasil edit",
                "avatar": "http://localhost:3000/api/circle/download/avatar/35-circle-avatar-5dbfff829ebe6.jpg",
                "founded_at": "2021-07-01T08:45:08.000Z"
            },
            "admin": {
                "id": 35,
                "name": null,
                "username": "user1",
                "email": "user1@gmail.com"
            }
        }
    }
}
```

## [GET] Get Circle's avatar
Request :
- Method : GET
- Endpoint : `/api/circle/download/avatar/:name`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

``Downloadable file```

or

```json 
{
    "code" : "500",
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

## [GET] Get members item(s)
Request :
- Method : GET
- Endpoint : `/api/circle/onsale`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code": 200,
    "status": "OK",
    "data": {
        "items_data": [
            {
                "id": 35,
                "username": "user1",
                "joined_at": "2021-07-01T08:45:08.000Z",
                "items": [
                    {
                        "id": 11,
                        "name": "AAAAAAAAAAAAA",
                        "description": "Remote AC adalah blablablabla",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-01T08:35:28.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 35
                    },
                    {
                        "id": 10,
                        "name": "cinduncjdncjdn",
                        "description": "Remote AC adalah blablablabla",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-01T08:35:23.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 35
                    },
                    {
                        "id": 9,
                        "name": "niwadiowajdoiawj",
                        "description": "Remote AC adalah blablablabla",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-01T08:35:19.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 35
                    }
                ]
            },
            {
                "id": 36,
                "username": "user2",
                "joined_at": "2021-07-02T07:41:55.000Z",
                "items": [
                    {
                        "id": 13,
                        "name": "barang user 2 versi 2",
                        "description": "barang user 2",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-02T07:38:53.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 36
                    },
                    {
                        "id": 12,
                        "name": "barang user 2",
                        "description": "barang user 2",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-02T07:38:45.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 36
                    }
                ]
            },
            {
                "id": 37,
                "username": "user3",
                "joined_at": "2021-07-02T07:44:50.000Z",
                "items": [
                    {
                        "id": 15,
                        "name": "barang user 3 versi 100",
                        "description": "barang user 3",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-02T07:39:33.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 37
                    },
                    {
                        "id": 14,
                        "name": "barang user 3 ",
                        "description": "barang user 3",
                        "quantity": 10,
                        "price": 30000,
                        "created_at": "2021-07-02T07:39:26.000Z",
                        "updated_at": null,
                        "deleted_at": null,
                        "user_id": 37
                    }
                ]
            }
        ]
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
    "circle-avatar" : "filelocation"
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
    "seller_id" : 36,
    "shipping_address" : "Jalan Sungai Raya Dalam Komplek Mitra Indah Utama 6 Nomor A20 Pontianak, Kalimantan Barat",
    "courier" : "JNE",
    "item_list" : [
        {
            "item_id" : 12,
            "notes" : "Pakai Tas warna pink ya",
            "quantity" : 2
        },
        {
            "item_id" : 13,
            "notes" : "Pakai Tas warna pink ya",
            "quantity" : 2
        }
    ]
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
    "code": 200,
    "status": "OK",
    "data": {
        "orders": [
            {
                "id": 10,
                "buyer_id": 37,
                "seller_id": 36,
                "item_list": [
                    {
                        "item_id": 12,
                        "item_name": "barang user 2",
                        "price": 30000,
                        "quantity": 2
                    },
                    {
                        "item_id": 13,
                        "item_name": "barang user 2 versi 2",
                        "price": 30000,
                        "quantity": 2
                    }
                ]
            },
            {
                "id": 11,
                "buyer_id": 37,
                "seller_id": 36,
                "item_list": [
                    {
                        "item_id": 12,
                        "item_name": "barang user 2",
                        "price": 30000,
                        "quantity": 1
                    },
                    {
                        "item_id": 13,
                        "item_name": "barang user 2 versi 2",
                        "price": 30000,
                        "quantity": 1
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
- Endpoint : `/api/order/admin/approve/:order_id/:value`
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
- Endpoint : `/api/order/seller/approve/:order_id/:value`
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