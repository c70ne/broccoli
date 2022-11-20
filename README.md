## 1. Overview 

Broccoli & Co. landing page with signup form. This landing page was mocked up in response to a coding challenge presented during the interview process for a Frontend Engineer role. Main technologies utilised are CSS, Javascript, React.js, Next.js (including experimental features from Next.js 13), and Axios.

## 2. Description

This single page website is designed with a focus on just one call-to-action (CTA) button which triggers the UI to render a form inside a modal (popup). Instead of using traditional form elements, I have designed the form as a controlled component where React state will generate real-time feedback when the input requirements are not met. Only until a user has satisfied all input requirements will the submit button be enabled. On submit, the collected user information will get posted to an endpoint from React state via usage of Axios.

## 3. What's next?

If I were to dedicate more time to the project, my areas of focus would be refactoring the codebase to further modularise everything into smaller components, shift more of the form validations into functions rather than using ternaries, and implement some tests (end-to-end, integration, unit).

## 4. How to use?

i. Clone this repo to your local machine and from the root directory execute:

```bash
npm install
# or
yarn install
```

ii. Run the development server:

```bash
npm run dev
# or
yarn dev
```

iii. View the website in your browser: 
Open [http://localhost:3000](http://localhost:3000)

## 5. Live deployment
You can visit a live deployment of this website by visiting: 
https://broccoli.c70ne.vercel.app
