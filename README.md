# Dynamic Form System

Dynamic Form System is a web application that allows users to create, manage, and respond to dynamic forms. It is built using Node.js, Express, MongoDB, and EJS.

## Features

- Create dynamic forms with various question types (short text, long text, multiple choice, email, statement).
- Submit responses to forms.
- View all responses for a form.
- Responsive design using Bootstrap.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/7sg56/dynamic-form-builder.git
    cd dynamic-form-builder
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the MongoDB server:
    ```sh
    mongosh
    ```

4. Start the application:
    ```sh
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Creating a Form

1. Navigate to the home page.
2. Enter a title for your form.
3. Add questions by clicking the "+ Add Question" button.
4. Select the question type and fill in the necessary details.
5. Click "Create Form" to save the form.

### Submitting a Response

1. Navigate to the form URL.
2. Fill in the responses to the questions.
3. Click "Submit Response" to save your responses.

### Viewing Responses

1. Navigate to the form URL followed by `/responses`.
2. View all the responses submitted for the form.

## Project Structure

```
typeform-clone/
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── formBuilder.js
├── routes/
│   └── forms.js
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── form.ejs
│   ├── index.ejs
│   ├── responses.ejs
│   └── thanks.ejs
├── models/
│   └── Response.js
├── app.js
├── package.json
└── README.md
```

## Dependencies

- express
- mongoose
- ejs
- ejs-mate
- body-parser
- method-override
- express-session
- uuid
- nodemon (dev dependency)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
