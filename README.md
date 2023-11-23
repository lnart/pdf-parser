# Basic PDF Management Web Application

This web application enables authenticated users to upload PDFs, delete them, and view their plain text. Built with Next.js, Express.js, React, and Node.js, it incorporates JWT for secure authentication.

## Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
npm install
```
## Configuration
create a .env file in the server directory root and add the following environment variables

```bash
USERNAME= the username you want to login with
PASSWORD= the password you want to login with
ACCESS_TOKEN_SECRET= a random 64 bit hex-string
```
Adjust the multer.ts file to specify the upload directory for the pdf files

## Running the Application 
start the application in development mode
```bash
npm run dev
```
## Usage
### Login:
Authenticate using the credentials defined in the .env file
### PDF Management:
Upload and delete PDF files. View the plain text of previously uploaded ones

## API Routes
* Fetch PDF's: "GET /api/v1/uploads"
* Upload PDF: "POST /api/v1/upload"
* Delete PDF: "DELETE /api/v1/delete/:filename"
* Validate Token: "POST /api/v1/validate-token"
* Login: "POST api/v1/login"
