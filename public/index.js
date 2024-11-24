import {renderHeader, renderStaticContent} from "./public/utilities/render/headerRenderUtilities.js";


const router = new Navigo("/");

router.on('/login', function() {
    renderHeader();
})

    // Обработчик маршрута для страницы 404
    .notFound(() => {
        renderStaticContent("/resources/templates/notFound.html");  // Загружаем страницу 404
    })

// Разрешение маршрута
router.resolve();


