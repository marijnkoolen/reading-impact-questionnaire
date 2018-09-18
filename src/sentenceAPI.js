
const SentenceAPI = {

    sentenceServer : null,

    annotator : null,

    makeRequest : (method, url, postData) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (method === "POST") {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(postData));
        }
        else if (method === "GET") {
            xhr.send();
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                callback(null, responseData);
            }
        }

    },

    loadSentences : (annotator, callback) => {
        if (!(SentenceAPI.annotator)) {
            SentenceAPI.annotator = annotator;
        }
        let url = SentenceAPI.sentenceServer + "/load_sentences?annotator=" + annotator;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                //console.log(responseData);
                callback(null, responseData);
            }
        }
    },

    loadProgress : (annotator, callback) => {
        if (!(SentenceAPI.annotator)) {
            SentenceAPI.annotator = annotator;
        }
        let url = SentenceAPI.sentenceServer + "/load_progress?annotator=" + annotator;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                callback(null, responseData);
            }
        }
    },

    saveResponse : (response, callback) => {
        let url = SentenceAPI.sentenceServer + "/save_response";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(response));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                callback(null, responseData);
            }
        }
    }
}

export default SentenceAPI;
