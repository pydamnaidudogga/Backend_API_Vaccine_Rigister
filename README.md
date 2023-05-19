# Backend_API_Vaccine_Rigister

-	User Rigister and SignIn only.
-	Admin logIn username:Pydamnaidu and password:pydamnaidu@dogga
-	Schemas for Admin, slots and User
-	Slot book for vaccine
- Update slot
-	get list of all users who are rigisterd for the vaccine

## Installation

```bash
npm install
```

## API Reference

#### User Rigister

```http
  POST /users/signup
```

| Parameter | Type     | 
| :-------- | :------- | 
| `name`      | `string` |
| `phoneNumber`      | `Number` |
| `age`      | `Number` |
| `pincode`      | `Number` |
| `aadharNo`      | `Number` |
| `password`      | `string` |


#### User signIn

```http
  POST /users/signin
```

| Parameter | Type     | 
| :-------- | :------- | 
| `phoenNumber`      | `Number` |
| `password`      | `string` |


#### book slot

```http
  POST /users/:userId/slots/:dose
```

| Parameter | Type     | 
| :-------- | :------- | 
| `userId`      | `string` |
| `dose`      | `first or second` |
| `sloteId`      | `string` |


#### Check slot availability

```http
  POST /slots/availability
```
| Parameter | Type     | 
| :-------- | :------- |
| `slotId` | `string` |


#### update the user slot booking

```http
  Put /users/:userId/slots/:dose
```
| Parameter | Type     | 
| :-------- | :------- | 
| `userId`      | `string` |
| `dose`      | `first or second` |
| `sloteId`      | `string` |

#### Admin login

```http
  post /admin/login
```
| Parameter | Type     | 
| :-------- | :------- | 
| `userName`      | `String` |
| `password`      | `string` |

#### List of all rigisterd user for admin 

```http
  get /admin/rigisterd_users_list
```
#### List of all users for a particular slot for admin 

```http
  POST /admin/slot_users_list
```
| Parameter | Type     | 
| :-------- | :------- |
| `slotId` | `string` |







## Contributing


Please make sure to update tests as appropriate.
