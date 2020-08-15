# SkateboardGo

A full-stack project for people who enjoy skateboarding to find perfect places and find friends to go skateboarding together! 

![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/home.gif)    
<img src="https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/homeRWD.gif" width="400"/>

## Highlights
#### Map    
- Visitors can 
    - see the information about skateboarding places or stores on the map.
    - see comments and ratings of the places or stores.
- Registered users can 
    - share the information about skateboarding places or stores on the map.
    - leave comments and ratings of the places or stores.


#### Group    
- Visitors can 
   -  see skateboarding gathered groups.
- Registered users can 
   -  create skateboarding gathered groups.
   -  join any of the groups.
   -  leave messages in the event.
   
   
#### Member System  
- Registered users can 
   -  save skateboarding groups they join and track
   -  save location they like


## Demo
Website link: http://100.20.247.196/      

[Test User]     
username: test     
password: test123456    

## Table of Contents
* [Technologies](#Technologies)   
* [Code Structures](#Code-Structures)
    * [Front-end Design](#Front-end-Design)
    * [Back-end Class Diagrams](#Back-end-Class-Diagrams)
    * [Database Schema](#Database-schema)
        
* [Page](#Page)
    * [Map](#Map)
    * [Group](#Group)
    * [User Profile](#User-Profile)
    * [Member System](#Member-System)

* [Plan for next version](#Plan-for-next-version)
* [Contact](#Contact)

## Technologies

#### Front-end
- Front-End Fundamental
    - HTML / CSS / JavaScript
    - RWD
- Front-End Frameworks
    - React
    - React Hooks
    - React Context API
    - React Router
- Third-Party API
    - RESTful API: Axios library
    - Map: Google Maps API, Geocoding API
- Other
    - Material Design: Material UI
    - Module Bundler: Webpack
    - Compiler: Babel
    - WebStorage: localStorage
    - Unit Test: Jest

####  Back-end
- Back-End Framework
    - Django
    - Django REST Framework with Simple JSON Web Token (JWT)
- Database
    - PostgreSQL

#### Workflow
- Version Control : Git / GitHub
- SCRUM Sprint Planning: JIRA
- Hosting: Amazon Web Services (AWS) EC2 with NGINX and RDS.

## Code Structures
### Front-end Design
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/React_design.png)    
    
### Back-end Class Diagrams
#### User
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_user.png)    
#### Token
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_token.png)    
#### Guidemap
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_guidemap.png)    
#### GuidemapComments
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_GuidemapComments.png)    
#### FriendsGroup
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_friendsGroup.png)    
#### FriendsGroupComments
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/UML_friendsGroupComments.png)    


### Database Schema
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/DBschema_app.png)    
   
       
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/design/DBschema_user.png)    
    
    
## Page
#### Map    
Users can add locations on the map and provide information such as opening times, phone numbers, traffics and details. They can also add comments and ratings for these places. There is also a star rating system displaying the ranking of the locations.    
     
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/map.png)

![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/mapcreate.png)    
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/maplist.png)
    
#### Group  
Users can create and view the groups' activities, join and track the events they like. The information will be shown in profile page for records. The outdated events are shown in the history page by clicking the history groups button.    
       
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/grouplist.png)
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/groupdetail.png)    
       
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/groupcreate.png)  
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/alert.png)
    
    
#### User Profile
It records the maps users like, groups they join and track in the future and the past. Users can also edit their own profile, including profile pictures, passwords, nicknames, current locations and self-introduction.    
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/profilemap.png)
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/profilegroup.png)
      
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/profileedit.png)
      
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/profilehistory.png)    
    
     
#### Member System
Users should register to become a member to experience all the functions provided by SkateboardGo. Passwords are hashed with SHA-256, providing a more secure member system.
    
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/login.png)
      
![](https://github.com/spaceneurocruzz/Skateboard_Website/blob/master/readme/ui/signup.png)
    
    
## Plan for next version
- English version
- Users introduction for the public
- Enhance RWD experience for viewing tables 
- New function "Calendar" for skateboarding activities
- New function "Discussion board" for people to discuss about technical skills or ask questions

## Contact
Hsin-Ju Lin(Sandy Lin)    
s1127925@gmail.com