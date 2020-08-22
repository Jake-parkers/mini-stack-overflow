import app from "./components/app";

const port = process.env.PORT || 3000;

process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', (error) => {
    //handle error here
    console.log(error);
});

app.listen(port, () => {
    console.log(`Server listening on Port ${port}\n Press Ctrl-C to stop it\n`);
})