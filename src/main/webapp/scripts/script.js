const table = document.getElementById("result-table");
const error = document.getElementById("error");

class Validator {
    constructor(state) {
        this.state = state;
        this.validators = [];
    }

    addValidator(validator) {
        this.validators.push(validator);
    }

    validateAll() {
        for (const validator of this.validators) {
            validator.validate();
        }
    }
}

class XValidator extends Validator {
    validate() {
        const possibleX = new Set([-5, -4, -3, -2, -1, 0, 1, 2, 3]);
        if (isNaN(this.state.x) || !possibleX.has(this.state.x)) {
            error.hidden = false;
            error.innerText = `x should be in [${[...possibleX].join(", ")}]`;
            throw new Error(`x должен быть в диапазоне [${[...possibleX].join(", ")}]`);
        }
    }
}

class YValidator extends Validator {
    validate() {
        const yString = this.state.y.toString().trim();


        const [, decimalPart] = yString.split('.');
        if (decimalPart && decimalPart.length > 15) {
            error.hidden = false;
            error.innerText = "y should have at most 15 decimal places";
            throw new Error("Слишком большое количество знаков после запятой");
        }

        const y = Number(this.state.y);

        if (isNaN(y) || y < -5 || y > 3 + Number.EPSILON) {
            error.hidden = false;
            error.innerText = "y should be in range [-5, 3]";
            throw new Error("Число Y не входит в диапазон");
        }
    }
}

class RValidator extends Validator {
    validate() {
        const possibleR = new Set([1, 2, 3, 4, 5]);
        if (isNaN(this.state.r) || !possibleR.has(this.state.r)) {
            error.hidden = false;
            error.innerText = `R should be in [${[...possibleR].join(", ")}]`;
            throw new Error(`R должен быть в диапазоне [${[...possibleR].join(", ")}]`);
        }
    }
}

const state = {
    x: 0, y: 0, r: 0
};

document.getElementById("x-select").addEventListener("change", (event) => {
    state.x = parseInt(event.target.value);
});

document.getElementById("y-select").addEventListener("input", (event) => {
    state.y = parseFloat(event.target.value);
});

document.getElementById("r-select").addEventListener("change", (event) => {
    state.r = parseInt(event.target.value);
    scaleGraph(state.r);
});


const xValidator = new XValidator(state);
const yValidator = new YValidator(state);
const rValidator = new RValidator(state);
const validator = new Validator(state);
validator.addValidator(xValidator);
validator.addValidator(yValidator);
validator.addValidator(rValidator);

document.getElementById("coordinate-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    validator.validateAll();
    error.hidden = true;

    const params = new URLSearchParams(state)
    const url = `/WEB2-1.0-SNAPSHOT/controller-servlet?${params}`
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const doc = await response.text()
        document.open();
        document.write(doc)
        document.close()
    } else {
        error.hidden = false
        error.innerText = 'Error in getting arguments from server.'
        throw new Error("Error in getting arguments from server.")
    }
});


document.getElementById("coordinate-plane").addEventListener("click", async function (event) {
    if (!state.r || state.r <= 0) {
        error.hidden = false;
        error.innerText = "Радиус не установлен или он равен нулю. Установите радиус для обработки клика.";
        return;
    }

    // Получаем размеры SVG
    const svg = event.currentTarget.querySelector("svg");
    const svgRect = svg.getBoundingClientRect();

    // Вычисляем координаты клика относительно SVG
    const clickX = event.clientX - svgRect.left;
    const clickY = event.clientY - svgRect.top;

    // Преобразуем координаты в систему координат графика (центр 150, 150)
    const graphX = ((clickX - svgRect.width / 2) / 40);
    const graphY = -((clickY - svgRect.height / 2) / 40);

    // Отрисовка точки на графике
    drawPoint(graphX, graphY);

    // Сохраняем координаты точки в sessionStorage
    savePointToSession({x: graphX, y: graphY, r: state.r});

    // Отправляем координаты на сервер
    const params = new URLSearchParams({
        x: graphX, y: graphY, r: state.r, graph: true,
    });

    const url = `/WEB2-1.0-SNAPSHOT/controller-servlet?${params}`;
    const response = await fetch(url, {
        method: "GET"
    });

    if (response.ok) {
        location.reload();
        const doc = await response.text();
        document.open();
        document.write(doc);
        document.close();
    } else {
        error.hidden = false;
        error.innerText = 'Ошибка при отправке данных на сервер.';
        throw new Error("Ошибка при отправке данных на сервер.");
    }
});

// Функция для отрисовки точки на графике
function drawPoint(x, y) {
    const svg = document.querySelector("#coordinate-plane svg");
    const svgRect = svg.getBoundingClientRect();

    // Преобразуем координаты графика обратно в координаты SVG
    const svgX = svgRect.width / 2 + x * 40;
    const svgY = svgRect.height / 2 - y * 40;

    // Проверка на валидность значений перед созданием круга
    if (isNaN(svgX) || isNaN(svgY) || !isFinite(svgX) || !isFinite(svgY)) {
        console.error("Некорректные значения для отрисовки: svgX =", svgX, "svgY =", svgY);
        return;
    }

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circle.setAttribute("cx", svgX.toString());
    circle.setAttribute("cy", svgY.toString());
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "red");

    svg.appendChild(circle);
}

// Функция для сохранения точки в sessionStorage
function savePointToSession(point) {
    const points = JSON.parse(sessionStorage.getItem('points')) || [];
    points.push(point);
    sessionStorage.setItem('points', JSON.stringify(points));
}

// Функция для загрузки точек из sessionStorage
function loadPointsFromSession() {
    const points = JSON.parse(sessionStorage.getItem('points')) || [];
    points.forEach(point => drawPoint(point.x, point.y));
}

function scaleGraph(r, initial = false) {
    const SCALE_FACTOR = 40;

    const svg = document.querySelector("#coordinate-plane svg");
    const {width, height} = svg.getBoundingClientRect();

    svg.querySelectorAll("text").forEach(element => element.remove());

    [-r, -r / 2, r / 2, r].forEach(rad => {
        for (let i = 0; i < 2; i++) {
            const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

            textElement.setAttribute("x", `${width / 2 + i * (rad * SCALE_FACTOR)}`);
            textElement.setAttribute("y", `${height / 2 - (1 - i) * (rad * SCALE_FACTOR)}`);

            textElement.setAttribute("fill", "black");
            textElement.textContent = rad.toString();
            svg.appendChild(textElement);
        }
    });

    const svgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const svgTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svgRect.setAttribute("width", `${r / 2 * SCALE_FACTOR}`);
    svgRect.setAttribute("height", `${r * SCALE_FACTOR}`);
    svgRect.setAttribute("x", `${width / 2 - r / 2 * SCALE_FACTOR}`);
    svgRect.setAttribute("y", `${height / 2}`);

    svgTriangle.setAttribute("points", `150,150 ${width / 2 - r * 40},150 150,${height / 2 - r / 2 * 40}`);

    //svgCircle.setAttribute("d", `M 150 150 L 150 ${height / 2 - r * SCALE_FACTOR} A ${r * SCALE_FACTOR} ${r * SCALE_FACTOR} 0 0 1 ${width / 2 + r * SCALE_FACTOR * 1.5} 150 Z`);
    const startX = width / 2;
    const startY = height / 2;
    const arcX = startX + r * SCALE_FACTOR;
    const arcY = startY;

    const largeArcFlag = 0;  // Для дуги меньше 180 градусов

    svgCircle.setAttribute(
        "d",
        `M ${startX} ${startY} L ${startX} ${startY - r * SCALE_FACTOR} A ${r * SCALE_FACTOR} ${r * SCALE_FACTOR} 0 ${largeArcFlag} 1 ${arcX} ${startY} Z`
    );
    [svgRect, svgTriangle, svgCircle].forEach(element => {
        if (!initial) {
            document.getElementById(`graph-${element.tagName.toLowerCase()}`).remove();
        }

        element.setAttribute("fill", "blue");
        element.setAttribute("fill-opacity", "0.3");
        element.setAttribute("id", `graph-${element.tagName.toLowerCase()}`)

        svg.appendChild(element);
    });
}

function main() {
    scaleGraph(1, true);
    loadPointsFromSession();
}

// Загружаем точки при загрузке страницы
window.addEventListener('load', main);
