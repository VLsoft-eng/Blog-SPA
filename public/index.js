import {HeaderRenderer} from "./utilities/render/headerRenderUtilities.js";
import {renderContent} from "./utilities/render/contentRenderUtilities.js";
import {LoginViewController} from "./ViewControllers/LoginViewController.js";
import {LogoutViewController} from "./ViewControllers/LogoutViewController.js";
import {RegisterViewController} from "./ViewControllers/RegisterViewController.js";
import {MainPageViewController} from "./ViewControllers/MainPageViewController.js";
import {ProfileViewController} from "./ViewControllers/ProfileViewController.js";


export const router = new Navigo("/");

const headerRenderer = new HeaderRenderer();
const loginViewController = new LoginViewController(headerRenderer);
const logoutViewController = new LogoutViewController(headerRenderer);
const registerViewController = new RegisterViewController(headerRenderer);
const mainPageViewController = new MainPageViewController(headerRenderer);
const profileViewController = new ProfileViewController(headerRenderer);

router
    .on('/', async function () {
        await mainPageViewController.onLoad()
        router.updatePageLinks();
    })
    .on('/login', async function () {
        await loginViewController.onLoad();
        router.updatePageLinks();
    })
    .on('/register', async function () {
        await registerViewController.onLoad();
        router.updatePageLinks();
    })
    .on('/logout', async function () {
        await logoutViewController.onLoad();
        router.updatePageLinks();
    })
    .on('/profile', async function () {;
        await profileViewController.onLoad();
        router.updatePageLinks();
    })
    .notFound(async () => {
        console.log("Not Found");
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/notFound.html");
        router.updatePageLinks();
    })
    .resolve();





