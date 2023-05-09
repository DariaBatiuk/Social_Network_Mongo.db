## Social_Network_Mongo.db
The database in question utilizes MongoDB and provides API endpoints for efficient interaction with the database. Specifically tailored for a social networking platform, this database includes endpoints for managing Users, their associated thoughts, and the reactions of their friends towards those thoughts.

## User Story
```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

# Mock Up
![image](https://user-images.githubusercontent.com/83068010/224874402-de84480a-1a91-4fa1-ab90-8670809502f2.png)

# Video Link
https://drive.google.com/file/d/1XLIsNkpwAGfp3ptqNlzhneIPo0sxJKx9/view

