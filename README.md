# My Portfolio
## Find it here [here](https://mitchellwportfolio.com)
### Stack
Used this portfolio as my first exposure to Next.js and Tailwind and realised how fun it is to use the technologies.

The **Blog** ~~is still a work in progress~~ is now complete and even includes a brand new user dashboard, ( for me only ) and can be found on the Blog branch if you wish the view the code. I'll be posting unit reviews, and also my experiences while developing my projects.

## My Dashboard

<img width="500" alt="image" src="https://github.com/mwaghorn2000/portfolio/assets/44543941/6d6bf106-8b29-4019-af8c-f60bd791ef25">

This is the authentication i added for myself to access my post dashboard. I used cypher to encrypt my password and i store the userinfo on mongodb cloud. Then once i log in the server creates a cookie and stores it in the users browser, which is used to authenticate login beyond the login page. I implemented this method as i wanted experience with Json Web Tokens and client side storage.

### Next.js Middleware
This is when i found out about middleware for ts. It made redirecting unauthenticated users extremely easy and straight forward.

### The _Dashboard_

<img width="1000" alt="image" src="https://github.com/mwaghorn2000/portfolio/assets/44543941/bca29478-d036-44ba-9c3e-e4595caa0e4c">

Its not much but it gets the job done. Here i can access a form to create a new post and update existing posts ( form is prefilled ), and then also delete posts.

### Thats it

There's not really much more going on in the dashboard at the moment. However it was a great experience working with Next.js, MongoDB, and the various other libraries i used for this project, and im confident to tackle a new and more challenging project. Stay tuned.


Hosted and Deployed on Vercel

### Contact me @ m.waghorn2000@gmail.com

## Running locally

Use Node.js and npm in your Ubuntu/WSL terminal. If you installed Node with nvm, load it first:

```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24
```

Install dependencies with `npm ci`. Copy `.env.example` to `.env.local` if you do not already have a local configuration, then fill in:

- `MONGODB_URI`: your MongoDB connection string.
- `MONGODB_DB`: the existing database name if you want your original posts and login.
- `JWT_SECRET`: a random secret generated using the command in `.env.example`.

Keep `.env.local` private; it is ignored by Git. Start the app with `npm run dev` and open http://localhost:3000. Restart the development server after changing environment variables.

The blog is at `/Blog` and the author login is at `/Blog/Login`. The database needs a `posts` collection and a `users` collection. Login expects a user document with `username` and a bcrypt hash in `password`. A fresh database will not contain your previous posts or an author account.

Run `npm test -- --runInBand` and `npm run lint` to check the code.
