function main() {
    const sheetXhr = new XMLHttpRequest()
    sheetXhr.addEventListener("load", function () {
        if (sheetXhr.readyState === sheetXhr.DONE) {
            if (sheetXhr.status === 200) {
                const linkElement = document.createElement("link")
                linkElement.rel = "stylesheet"
                linkElement.href = "http://localhost:3000/css"
                document.head.appendChild(linkElement)
            }
        }
    })

    sheetXhr.addEventListener("error", function () {
        const linkElement = document.createElement("link")
        linkElement.rel = "stylesheet"
        linkElement.href = "https://flanger001.github.io/uesp.net/dist/style.css"
        document.head.appendChild(linkElement)
    })
    sheetXhr.open("GET", "http://localhost:3000/css")
    sheetXhr.send()
}

main()