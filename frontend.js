(() => {
    const App = {
        config: {
            baseUrl: "http://localhost:3000/fibonacci"
        },
        htmlElements: {
            fibonacciForm: document.querySelector("#fibonacci-form"),
            fibonacciInput: document.querySelector("#fibonacci-input"),
            output: document.querySelector("#output")
        },
        init: () => {
            App.htmlElements.fibonacciForm.addEventListener("submit", App.handlers.handleOnSubmitFibonacciForm)
        },
        handlers: {
            handleOnSubmitFibonacciForm: (event) => {
                event.preventDefault();
                App.methods.fetchFibonacci();
            }
        },
        methods: {
            buildUrlQuery: (number) => {
                return `${App.config.baseUrl}?length=${number}`
            },
            fetchFibonacci: async () => {
                const url = App.methods.buildUrlQuery(App.htmlElements.fibonacciInput.value);
                console.log(url);
                const result = await App.utils.fetch(url)
                App.methods.render(result);
            },
            render: (result) => {
                App.htmlElements.output.innerHTML = `<pre>${JSON.stringify(result, null, 4)}</pre>`;
            }
        },
        utils: {
            fetch: async (url, options) => {
                try {
                    const response = await fetch(url, options);
                    if (!response.status === 200) {
                        throw Error("Error fetching data");
                    }
                    return await response.json();
                } catch (error) {
                    return console.log(error);
                }
            }
        }
    }
    App.init()
})()