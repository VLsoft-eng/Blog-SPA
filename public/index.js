import {HeaderRenderer} from "/utilities/render/headerRenderUtilities.js";
import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {LoginViewController} from "/ViewControllers/LoginViewController.js";
import {LogoutViewController} from "/ViewControllers/LogoutViewController.js";
import {RegisterViewController} from "/ViewControllers/RegisterViewController.js";
import {MainPageViewController} from "/ViewControllers/MainPageViewController.js";
import {ProfileViewController} from "/ViewControllers/ProfileViewController.js";
import {PostDetailsViewController} from "/viewControllers/PostDetailsViewController.js";
import {CommunitiesViewController} from "/viewControllers/CommunitiesViewController.js";


export const router = new Navigo("/");

window.headerRenderer = new HeaderRenderer();
const loginViewController = new LoginViewController();
const logoutViewController = new LogoutViewController();
const registerViewController = new RegisterViewController();
const mainPageViewController = new MainPageViewController();
const profileViewController = new ProfileViewController();
const postDetailsViewController = new PostDetailsViewController();
const communitiesViewController = new CommunitiesViewController();


router
    .on('/', async ({ queryString }) => {
        const params = new URLSearchParams(queryString);
        await mainPageViewController.onLoad(params);
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
    .on('/profile', async function () {
        await profileViewController.onLoad();
        router.updatePageLinks();
    })
    .on('/post/:id', async function ({data}) {
        await postDetailsViewController.onLoad(data);
        router.updatePageLinks();
    })
    .on('/communities', async function () {
        await communitiesViewController.onLoad();
        router.updatePageLinks();
    })
    .notFound(async () => {
        console.log("Not Found");
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/notFound.html");
        router.updatePageLinks();
    })
    .resolve();





