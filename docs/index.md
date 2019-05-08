The Volunteer Matching project is a web app that assists in better management of volunteer matching operations. It will track and provide matching suggestions of volunteer partners, opportunities for volunteers, and volunteers. Later features could include communications to build out functionality similar to a CRM.

# API

## Authentication
#### Basic Auth
Basic authentication requires providing a valid user's username and password in an Authorization: Basic header. The username and password has to be Base64 encoded.

Header example:  
`headers: "Authorization": "Basic " + btoa({username} + ":" + {password})`

#### Token Authentication
Token authentication requires providing a user's valid token in an Authorization: Bearer header. An expired token will return a 401 unauthorized error.

Header example:  
`headers: "Authorization": "Bearer {token}"`


## Resources
* Token
* User
* Partners
* Opportunities
* Tags
* Tag Categories


### Token
#### Variables
token

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/token/auth | POST | BasicAuth | | Requires basic auth and returns user token
/api/token/logout | POST | Token | | Log out by revoking user token

---

### User
#### Variables
id, username, email, roles, password

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/users/{id} | GET | Token and Admin role | include_email | Returns user data specified by id
/api/users | GET | Token and Admin role | include_email | Returns all users data
/api/users | POST | Token and Admin role | | Create a new user
/api/users/{id} | PUT | Token and Admin role | | Update existing user specified by id
/api/users/{id} | DELETE | Token and Admin role | | Delete user specified by id

---

### Partners
#### Variables
id, name, opportunity_count

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/partners/{id} | GET | | | Returns partner data specified by id
/api/partners | GET | | page, per_page, search | Returns all partners paginated and filtered by search
/api/partners | POST | Token | | Create a new partner
/api/partners/{id} | PUT | Token | | Update existing partner specified by id
/api/partners/{id} | DELETE | Token | | Delete partner specified by id

---

### Opportunities
#### Variables
id, active, name, description, shift_hours, commitment_length_months, start_date, end_date, training_time_hours, volunteers_needed, location_street, location_city, location_zip, tag_count, partner_name, partner_id, partner_string, frequency_unit, frequency_modifier, tags

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/opportunities/{id} | GET | | | Returns opportunity data specified by id
/api/opportunities | GET | | page, per_page, search, frequency_unit, frequency_modifier | Returns all opportunities paginated and filtered by search, frequency_unit, and frequency_modifier
/api/opportunities | POST | Token | | Create a new opportunity
/api/opportunities/{id} | PUT | Token | | Update existing opportunity specified by id
/api/opportunities/{id} | DELETE | Token | | Delete opportunity specified by id

---

### Tags
#### Variables
id, name, tag_category

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/tags/{id} | GET | | | Returns tag data specified by id
/api/tags | GET | | page, per_page | Returns all tags paginated and filtered by search
/api/tags | POST | Token and Admin role | | Create a new tag
/api/tags/{id} | PUT | Token and Admin role | | Update existing tag specified by id
/api/tags/{id} | DELETE | Token and Admin role | | Delete tag specified by id

---

### Tag Categories
#### Variables
id, category_name, tags

#### Endpoints

Endpoint | Method Type | Auth Required | Arguments | Description
---------|-------------|---------------|-----------|------------
/api/tag_categories/{id} | GET | | | Returns tag category data specified by id
/api/tag_categories | GET | | page, per_page | Returns all tag categories paginated and filtered by search
/api/tag_categories | POST | Token and Admin role | | Create a new tag category
/api/tag_categories/{id} | PUT | Token and Admin role | | Update existing tag category specified by id
/api/tag_categories/{id} | DELETE | Token and Admin role | | Delete tag category specified by id
