const showProjectsButton = document.querySelector('.btn-show-projects');
const inactiveProjects = document.querySelectorAll('.project:not(.active)');

document.addEventListener('DOMContentLoaded', function () {
    const curriculoLink = document.getElementById('curriculum-link');

    if (curriculoLink) {
        curriculoLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.open('./src/image/Matheus.pdf', '_blank');
        });
    }

    if (showProjectsButton) {
        showProjectsButton.addEventListener('click', () => {
            showMoreProjects();
            hideButton();
        });
    }
});

function hideButton() {
    if (showProjectsButton) {
        showProjectsButton.classList.add("remove");
    }
}

function showMoreProjects() {
    if (inactiveProjects.length > 0) {
        inactiveProjects.forEach(inactiveProject => {
            inactiveProject.classList.add('active');
        });
    }
}

async function fetchLanguageData() {
    try {
        const response = await fetch('./src/json/languages.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading language data:', error);
        return null;
    }
}

function updateTitle(title) {
    if (document.title) {
        document.title = title;
    }
}

function updateElementText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerText = text;
    }
}

function updatePageContent(data, language) {
    updateTitle(data[language].title);
    updateElementText('h1.logo', 'MG'); 

    // Menu
    updateElementText('a[href="#About"]', data[language].menuAbout);
    updateElementText('a[href="#skills"]', data[language].menuSkills);
    updateElementText('a[href="#projects"]', data[language].menuProjects);
    updateElementText('#curriculum-link', data[language].menuCurriculum);

    // Home
    updateElementText('.home h1', data[language].homeGreeting);
    updateElementText('.home h3', data[language].homeRole);

    // About
    updateElementText('.about h1', data[language].aboutTitle);
    updateElementText('.about h3', data[language].aboutContent);

    // Skills
    updateElementText('.skills h1', data[language].skillsTitle);

    // Projects
    updateElementText('.my-projects h2', data[language].projectsTitle);
    updateElementText('.btn-show-projects', data[language].showMoreButton);
}

async function loadLanguage(language) {
    const data = await fetchLanguageData();
    if (data) {
        updatePageContent(data, language);
    }
}

function setLanguage(language) {
    loadLanguage(language);
}

function setupLanguageSelector() {
    const languageSelector = document.querySelector('#language');
    if (languageSelector) {
        languageSelector.addEventListener('change', function () {
            const selectedLanguage = this.value;
            setLanguage(selectedLanguage);
        });
    }
}

document.addEventListener('DOMContentLoaded', setupLanguageSelector);
