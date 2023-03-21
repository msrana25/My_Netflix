# My_Netflix
![My_Netflix](https://i.imgur.com/WtfKAYM.png)

My_Netflix is a web application that features a beautiful UI/UX like Netflix, where movie data is pulled in from the TMDB database using their API. Users can easily sign up, login and logout using Firebase Authentication, and they can subscribe to monthly subscriptions using Stripe payment integration.

## Features

- Beautiful UI/UX like Netflix Application.
- Movie data is pulled in from TMDB database using their API.
- Supports Login and Logout using Firebase Authentication.
- Integrated with Stripe payment which allows users to have monthly subscriptions(For testing stripe, use card number as 424242424242 and expiry date as 04/24 and cvv as 424)
- Uses firestore DB provided by Firebase.

## Tech Stack

- Redux for state management
- Tons of CSS using BEM methodology for styling
- Payment authentication using Stripe
- User authentication using Firebase Authentication API
- Deployed using Firebase hosting

## Getting Started

To get started, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your Firebase and Stripe credentials.
4. Start the app using `npm start`.
