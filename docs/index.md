title: [Volunteer Matching]
description: [Better matching your volunteer tasks with volunteers]

The Volunteer Matching project is a web app that assists in better management of volunteer matching operations. It will track and provide matching suggestions of volunteer partners, opportunities for volunteers, and volunteers. Later features could include communications to build out functionality similar to a CRM.

# API

## Resources
* Token
* User
* Partners
* Opportunities
* Tags
* Tag Categories

### Token
#### Variables
access_token_cookie, refresh_token_cookie, csrf_access_token, csrf_refresh_token

#### Endpoints

Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/token/auth | POST | | Requires basic auth and returns access and return token cookies
/api/token/refresh | POST | | Requires refresh token and returns fresh access token cookie
/api/token/logout | POST | | Log out using by unsetting token cookies

### User
#### Variables
id, username, email, roles, password

#### Endpoints
Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/users/<int:id> | GET | include_email | Returns user data specified by id
/api/users | GET | include_email | Returns all users data
/api/users | POST | | Create a new user
/api/users/<int:id> | PUT | | Update existing user specified by id
/api/users/<int:id> | DELETE | | Delete user specified by id

### Partners
#### Variables
id, name, opportunity_count

#### Endpoints
Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/partners/<int:id> | GET | | Returns partner data specified by id
/api/partners | GET | page, per_page, search | Returns all partners paginated and filtered by search
/api/partners | POST | | Create a new partner
/api/partners/<int:id> | PUT | | Update existing partner specified by id
/api/partners/<int:id> | DELETE | | Delete partner specified by id

### Opportunities
#### Variables
id, active, name, job_number, description, shift_hours, commitment_length, start_date, end_date, training_time_required, volunteers_needed, location_street, location_city, location_zip, tag_count, partner_name, partner_id, partner_string, frequency, tags

#### Endpoints
Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/opportunities/<int:id> | GET | | Returns opportunity data specified by id
/api/opportunities | GET | page, per_page, search | Returns all opportunities paginated and filtered by search
/api/opportunities | POST | | Create a new opportunity
/api/opportunities/<int:id> | PUT | | Update existing opportunity specified by id
/api/opportunities/<int:id> | DELETE | | Delete opportunity specified by id

### Tags
#### Variables
id, name, tag_category

#### Endpoints
Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/tags/<int:id> | GET | | Returns tag data specified by id
/api/tags | GET | page, per_page | Returns all tags paginated and filtered by search
/api/tags | POST | | Create a new tag
/api/tags/<int:id> | PUT | | Update existing tag specified by id
/api/tags/<int:id> | DELETE | | Delete tag specified by id

### Tag Categories
#### Variables
id, category_name, tags

#### Endpoints
Endpoint | Method Type | Arguments | Description
---------|-------------|-----------|------------
/api/tag_categories/<int:id> | GET | | Returns tag category data specified by id
/api/tag_categories | GET | page, per_page | Returns all tag categories paginated and filtered by search
/api/tag_categories | POST | | Create a new tag category
/api/tag_categories/<int:id> | PUT | | Update existing tag category specified by id
/api/tag_categories/<int:id> | DELETE | | Delete tag category specified by id
