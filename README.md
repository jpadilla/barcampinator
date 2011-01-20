Barcampinator - A Barcamp tool built on Django.
====================

Introduction
---------------------
On November of last year @gio and I organized the official Barcamp San Juan in Puerto Rico. The first thing we decided to do was a web app where as users came in the door the would register themselves as attending and optionally as presenters. Then we built something on top of that to display in 2 plasma TVs spread around the event.

We built this in a couple of hours before the event, so we found ourselves fixing bugs as they happened right there. We decided we should make this an open source project for those Barcamp hackers and organizers. We feel this is going to help you as it helped us.


Installing
---------------------
You need to install the requirements. You can do something like this:

`pip install -r requirements.txt`

After installing the requirements, you can just run the project and you are of...

`./manage.py runserver`


Setup
---------------------
After installing head over to `http://localhost:8000/admin/`, login credentials are admin:barcamp.


Registration administration
---------------------
### Barcamps
*   Name.
*   Presentation length - How long(in minutes) are each presentation.
*   Event length - How long(in minutes) is the whole event.

### Presentation Categories
*   Name.

### Presentation Statuses
*   Name.

### Presentations
*   Name.
*   Category.
*   User.
*   Barcamp.
*   Status.

### Users
*   Name.
*	Email.
*	Twitter username.


Developers
---------------------
*   José Padilla - [http://twitter.com/jpadilla_](http://twitter.com/jpadilla_)
*	Giovanni Collazo - [http://twitter.com/gcollazo](http://twitter.com/gcollazo)