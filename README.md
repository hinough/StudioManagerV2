# StudioManagerV2
Update of my previous studiomanager, which was a tool I made for my sister. (Private due to sensitive data).
This will be a project where I learn to work with NodeJS and Express as I go. Setting the Studio Manager up as a server side service over having it as a clientside application.  
Allowing for multiplatform clients and separated useraccess.

## Node arguments
 * CLEAN - Will drop all tables in database and setup a clean install

## Requests  
 * [POST]/api/auth/signup: Requires jsondata -> username, email, password, [array]roles  
 * [POST]/api/auth/signin: Requires jsondata -> username, password; Returns id, username, email, [array]roles, accessToken  
 * [POST]/api/user/addCustomer: Requires jsondata -> name, customer_type, dato   AND x-access-token (From signin)
 * [POST]/api/user/findCustomers: Requires x-access-token; Returns [array]id, name, customer_type, dato, createdAt, updatedAt, userId  
 * [POST]/api/user/findCustomers/{key}: Requires x-access-token. {key} can be name or id of customer; Returns [array] same as findCustomers with result of given key as search term  
 * [DELETE]/api/user/removeCustomer/{id}: Requires x-access-token; Removes customer with given ID only if user owns it
