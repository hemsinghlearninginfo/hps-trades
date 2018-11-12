const test = async socket => {
    try {
        const res = await axios.get(
            "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
        ); // Getting the data from DarkSky
        socket.emit("FromAPI", res.data.currently.temperature);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
//return (new Date());
