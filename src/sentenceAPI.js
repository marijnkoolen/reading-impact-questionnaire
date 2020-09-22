
const SentenceAPI = {

    sentenceServer : null,

    version: null,

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

    registerId : (identifier, callback) => {
        let url = SentenceAPI.sentenceServer + "/register_annotator?annotator=" + identifier;
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

    checkIdExists : (identifier, callback) => {
        let url = SentenceAPI.sentenceServer + "/annotator_exists?annotator=" + identifier;
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

    loadSentences : (annotator, callback) => {
        if (!(SentenceAPI.annotator)) {
            SentenceAPI.annotator = annotator;
        }
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/load_sentences?annotator=" + annotator;
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

    loadAnnotatorJudgements : (annotator, callback) => {
        if (!(SentenceAPI.annotator)) {
            SentenceAPI.annotator = annotator;
        }
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/load_annotator_sentences?annotator=" + annotator;
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
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/load_progress?annotator=" + annotator;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                console.debug(responseData);
                callback(null, responseData);
            }
        }
    },

    saveComment : (comment, callback) => {
        let url = SentenceAPI.sentenceServer + "/save_comment";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(comment));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                callback(null, responseData);
            }
        }
    },

    saveResponse : (response, callback) => {
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/save_response";
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
    },

    removeResponse : (response, callback) => {
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/remove_response";
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
    },

    loadBoilerplate : (callback) => {
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/boilerplate";
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

    loadReadme : (callback) => {
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/readme";
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

    loadVersionData : (callback) => {
        let url = SentenceAPI.sentenceServer + "/" + SentenceAPI.version + "/version_data";
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

    checkDemographics : (annotator, callback) => {
        let url = SentenceAPI.sentenceServer + "/has_demographics?annotator=" + annotator;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                callback(null, responseData);
            }
        }
    },

    sendDemographics : (annotator, demographics, callback) => {
        let url = SentenceAPI.sentenceServer + "/register_demographics?annotator=" + annotator;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(demographics));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseData = JSON.parse(xhr.responseText);
                callback(null, responseData);
            }
        }
    }

}

export default SentenceAPI;
