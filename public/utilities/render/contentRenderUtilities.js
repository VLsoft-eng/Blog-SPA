async function renderStaticContent(contentPath) {
    const content = document.getElementById("content");
    content.innerHTML = '';

    if (!contentPath) {
        return;
    }
    const response = await fetch(contentPath);
    content.innerHTML = await response.text();
}

export async function renderContent(contentPath, callback) {
    await renderStaticContent(contentPath);
    if (callback) callback();
}
