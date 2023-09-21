import inquirer from "inquirer";
import run from "./run.js";

const questions = [
    {
        type: "input",
        name: "link",
        message: "What's the URL of the page that has the videos you want to download?",
        validate(value) {
            // adding https validation here
            const pass = value.match(/^https:\/\/.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*$/);
            if (pass) {
                return true;
            }
            return "Please enter a valid URL";
        }
    },
    {
        type: "input",
        name: "dir",
        message: "What's the name of the output directory you want to store the videos inside?",
        default() {
            return "Downloads";
        }
    },
    {
        type: "number",
        name: "batch",
        message: "How many videos do you want to download in a batch at a time? (max supported is 10)",
        validate(value) {
            const pass = value > 10 || value <= 0 ? false : true
            if (pass) {
                return true;
            }
            return "Please enter a positive integer less than or equal to 10";
        },
        default() {
            return 5;
        }
    },
    {
        default() {
            return "mkv,mp4,avi";
        },
        type: "input",
        name: "formats",
        message: "List out the formats you want to download in a csv separated by comma eg:mkv,mp4,avi, right now validations are only for mkv,mp4,avi",
        validate(value) {
            let pass = true;
            value.split(",").forEach(element => {
                if (element !== "mkv" && element !== "mp4" && element !== "avi") {
                    pass = false;
                }
            });
            if (pass) {
                return true;
            }
            return "Please enter the string comprising of valid video formats";
        }
    }
];

try {
    inquirer
        .prompt(questions)
        .then(
            (answers) => {
                const { link, dir, batch, formats } = answers;
                run(link, dir, batch, formats.split(","));
            }
        );
}
catch (error) {
    console.log("There was an error : ", error);
}