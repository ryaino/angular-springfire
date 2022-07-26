# angular-springfire

A set of classes to help remove some boilerplate when dealing with CRUD operations using angularfire2.

I know that this probably isn't very good code, but I thought no harm in putting it out there. 

The idea for this project came from trying to install [Firestorm](https://www.npmjs.com/package/firebase-firestorm)
and not being able to get anything working due to it being so out of date. As a result I started this project to fill
the gap I was trying to plug. 

Professionally I work as a Java developer, so I just started implementing things how I would when working in that
environment (this is where the name came from, referencing the spring framework).

The idea is to abstract away all common Firestore interactions so that your app contains less code while
also making a lot of your database interactions consistent with one another. Another thing I want to ensure is that the
ONLY dependency will be [AngularFire](https://www.npmjs.com/package/@angular/fire), this should hopefully make sure that
this project doesn't meet the same fate as Firestorm. 

I honestly have no idea what I'm doing with this, and I'm only implementing features or changing things as
the requirements for my current project change. Contributions are welcome, but ideally I would like to limit the code
to things I can personally wrap my head around 😅. I think it would be cool and make sense for a lot of what's here to
be converted into annotations, but I have no clue how to go about making those myself. 


