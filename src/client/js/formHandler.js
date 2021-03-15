function handleSubmit(event) {
    event.preventDefault()

    let article_url = document.getElementById('art_url').value

    if (Client.checkUrl(article_url)) {
        document.getElementById('label').innerHTML = "Loading..."
        document.getElementById('significance').innerHTML = "Loading..."
        let url = `http://localhost:8081/analyse/${encodeURIComponent(article_url)}`
        fetch(url)  
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            console.log(data.category_list[0])
            document.getElementById('label').innerHTML = data.category_list[0].label
            let absolute_relevance = Number(data.category_list[0].abs_relevance)*100
            document.getElementById('significance').innerHTML = `${absolute_relevance.toPrecision(4)}%`
        })
    } else {
        document.getElementById('art_url').value = ''
    }
}

export { handleSubmit }
