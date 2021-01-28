console.clear();
chrome.tabs.reload(function(){});
console.log(" |> start background |> ", new Date());


const connectReloader = () => {
    try {
        const ws = new WebSocket("ws://localhost:6699/");
        ws.onopen = () => {
            console.log(" |");
            console.log(" |>  connected to websocket");
        };
        ws.onmessage = (msg) => {
            if(msg.data === "reload") {
                console.log("reload");
                chrome.runtime.reload();
            }
        }
        ws.onclose = () => {
            setTimeout(connectReloader, 300);
        }
    } catch (e) {
        setTimeout(connectReloader, 300);
        return
    }

}

connectReloader();