# Fancy Todos

  

**Register**
--

Register an user

*  **URL**

/users/register
  

*  **Method**

`POST`

*  **Data Params**
```
{
	email: reynaldi@gmail.com,
	password: coba123
	name : Reynaldi,
}
```

*  **Success Response:**

*  **Code:** 201 (CREATED)

**Content:**
```
{
	email: reynaldi@gmail.com,
	password: coba123,
	name : Reynaldi
}
```

  

*  **Error Response:**

*  **Code:** 400 (Bad request)

*  **Content:**  `{ error : "Validation Errors" }`

*  **Code:** 500 (Internal Server Error )


  **Login**
--
  Login user

*  **URL**

/users/login
  
*  **Method**

`POST`

*  **Data Params**
```
{
	email: reynaldi@gmail.com,
	password: coba123
}
```
*  **Success Response:**

	*  **Code:** 200(OK)
	**Content:**
`
{
id : 1
}`


*  **Error Response:**

	*  **Code:** 401(Unauthorized)

		*  **Content:**  `{ error : "Email or Password wrong" }`

	*  **Code:** 500 (Internal Server Error )


**Add TODO**
--

Add a todo list

*  **URL**

/todos

  

*  **Method**

`POST`

  *  **Header**
  
  `access_token: string`


*  **Data Params**

```
{

title : "Lulus",

descriptions: "Lulus Hacktiv8",

status: false,

due_date: "2020-11-26"

}

```

*  **Success Response:**

*  **Code:** 201 (CREATED)

**Content:**

```

{

title : "Lulus",

descriptions: "Lulus Hacktiv8",

status: false,

due_date: "2020-11-26"

}

```

  

*  **Error Response:**

*  **Code:** 400 (Bad request)

*  **Content:**  `{ error : "Validation Errors" }`

*  **Code:** 500 (Internal Server Error )

  

**Show All Todos**
--

Show all todo list data

  

*  **URL**

/todos

  

*  **Method**

`GET`

  *  **Header**
  
  `access_token: string`
  

*  **Success Response:**

*  **Code:** 200 (OK)

**Content:**

```

[

{

id : 1,

title: "Go to phase 3",

description: "lulus phase 2 ",

status: false,

due_date: "2020-11-26"

},

{

id : 2,

title: "Lulus hacktiv 8",

description: "lulus sekali jalan",

status: false,

due_date: "2020-12-28"

}

]

```

*  **Error Response:**

*  **Code:** 500 (Internal Server Error )

**Find One Todo**

--

Show a todo list data

*  **URL**

/todos/:id

  

*  **Method**

`GET`

  *  **Header**
  
  `access_token: string`
    

*  **URL Params**

```

/:id

```


*  **Required:**

```

id=[integer]

```

  

*  **Success Response:**

*  **Code:** 200 (OK)

**Content:**

```
{

id : 1,

title: "Go to phase 3",

description: "lulus phase 2 ",

status: false,

due_date: "2020-11-26"

}
```

  

*  **Error Response:**

**Code:** 404 (NOT FOUND)

**Content:**  `{ error : "Cannot get /todos/7" }`

  

**Edit TODO**
--

Edit a todo list

*  **URL**

```

/todos/:id

```

  

*  **Method:**

  

`PUT`

  *  **Header**
  
  `access_token: string`
  

*  **URL Params**

```

/:id

```

  

*  **Required:**

```

id=[integer]

```

  

**Data Params**

```
{

id : 1,

title: "Go to phase 3",

description: "lulus phase 2 ",

status: false,

due_date: "2020-11-26"

}

```

  

-  **Success Response:**

-  **Code:** 200(OK)

**Content:**

```
{

id : 1,

title: "Go to phase 3 with > 90 score",

description: "lulus phase 2 ",

status: false,

due_date: "2020-11-26"

}
```

*  **Error Response:**

*  **Code:** 400 (Bad request)

*  **Content:**  `{ error : "Validation Errors" }`

*  **Code:** 404 (Not Found)

*  **Content:**  `{ error : "Not Found" }`

*  **Code:** 500 (Internal server error)


**Update TODO**
--

Update Todo List

  

* **URL**

```

/todos/:id

```

* **Method:**
`PATCH`
  
*  **Header**
  
  `access_token: string`
  


*  **URL Params**

```

/:id

```

  

*  **Required:**

```

id=[integer]

```

  

**Data Params**

```
{

id : 1,

title: "Go to phase 3 with > 90 score",

description: "lulus phase 2 ",

status: false,

due_date: "2020-11-26"

}
```

  

*  **Success Response:**

   *  **Code:** 200
   * **Content:**

```
{

id : 1,

title: "Go to phase 3 with > 90 score",

description: "lulus phase 2 ",

status: True,

due_date: "2020-11-26"

}
```

*  **Error Response:**

*  **Code:** 400 (Bad request)

*  **Content:**  `{ error : "Validation Errors" }`

*  **Code:** 404 (Not Found)

*  **Content:**  `{ error : "Not Found" }`

*  **Code:** 500 (Internal server error)

  

**Delete TODO**
--
Delete Todo list
  

* **URL**

```

/todos/:id

```

* **Method:**

`DELETE`
 
  *  **Header**
  
  `access_token: string`
  

*  **URL Params**

```

/:id

```

  
  

*  **Required:**

```

id=[integer]

```

  

*  **Data Params**

```

{

id : 1,

}

```

  

*  **Success Response:**

*  **Code:** 200(OK)

**Content:**

`Todo was successfully deleted`

*  **Error Response:**

*  **Code:** 404 (Not Found)

**Content:**  `{ error : "Not found" }`

*  **Code:** 500 (Internal Server Error )