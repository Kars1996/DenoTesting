import yoctoSpinner from "npm:yocto-spinner";

const spinner = yoctoSpinner({
    text: "Loading unicorns",
}).start();

setTimeout(() => {
    spinner.text = "Calculating splines";
}, 2000);

setTimeout(() => {
    spinner.success("Finished!");
}, 5000);
