function displayWeather(){
    const url = 'https://apiwww.easylogcloud.com//Users.svc/Favourites';
    const apiToken = 'b87d29a5-e4f9-11ed-bebe-0a94be46f06a';
    const userGUID = '3b0a168a-0bea-11ee-bebe-0a94be46f06a';
    const localTime = false;

    
    const params = {
        APIToken: apiToken,
        userGUID: userGUID,
        localTime: localTime
    };

    const queryParams = new URLSearchParams(params).toString();
    const apiUrl = `${url}?${queryParams}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data =>{
        // Lấy GUID và MACAddress cần tìm
        var GUID = "f7fb63d3-fb79-11ed-bebe-0a94be46f06a";
        var MACAddress = "98:8B:AD:22:47:75"; //Kho thành phẩm xưởng A
        
        //Tìm đối tượng JSON theo GUID và MACAddress
        var obj = data.find(item => item.GUID === GUID && item.MACAddress === MACAddress);

        // kiểm tra đối tượng JSON và lấy nhiệt độ và độ ẩm
        if (obj && obj.channels) {
            var temperatureChannel = obj.channels.find(channel => channel.type === "Temperature");
            var humidityChannel = obj.channels.find(channel => channel.type === "Humidity");

            if (temperatureChannel) {
                var temperature = temperatureChannel.currentReading;
                document.getElementById("temperature").textContent = "Nhiệt độ: " + temperature;
            } else {
                document.getElementById("temperature").textContent = "Không tìm thấy nhiệt độ cho GUID và MACAddress cụ thể.";
            }

            if (humidityChannel) {
                var humidity = humidityChannel.currentReading;
                document.getElementById("humidity").textContent = "Độ ẩm: " + humidity;
                updateHumidityIcon(humidity); // Gọi hàm updateHumidityIcon và truyền giá trị độ ẩm
            } else {
                document.getElementById("humidity").textContent = "Không tìm thấy độ ẩm cho GUID và MACAddress cụ thể.";
            }  
        } else {
            console.log("Không tìm thấy GUID và MACAddress cụ thể trong dữ liệu JSON.");
        }

        // Lấy thời gian từ hệ thống
        if (obj && obj.currentReadings) {
            var datetimeString = obj.currentReadings.datetime;
            var regex = /\/Date\((\d+)([+-]\d+)\)\//;
            var match = regex.exec(datetimeString);

            if (match) {
                var datetimeMilliseconds = parseInt(match[1]);
                var datetimeOffset = parseInt(match[2]);

                var datetime = new Date(datetimeMilliseconds);
                datetime.setUTCMilliseconds(datetime.getUTCMinutes() + datetimeOffset);

                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1; // Tháng được đánh số từ 0 - 11, nên cần +1 để đạt giá trị thực tế
                var day = datetime.getDate();
                var hours = datetime.getHours();
                var minutes = datetime.getMinutes();
                var seconds = datetime.getSeconds();

                document.getElementById("datetime").textContent = "Ngày giờ: " + datetime;

                document.getElementById("datetime1").textContent = "Ngày: " + year + "-" + month + "-" + day;

                document.getElementById("datetime2").textContent = "Giờ: " + hours + ":" + minutes + ":" + seconds;
            }
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });

    // const real_time = new Date();
    // document.getElementById("daterealtime").textContent = "Real time: " + real_time;
}

function realtimeclock () {
    const real_time = new Date();
    document.getElementById("daterealtime").textContent = "Real time: " + real_time;

}
    

// Gọi hàm displayWeather ban đầu
displayWeather();

// Gọi hàm realtimeclock 


// Cập nhật nhiệt độ và độ ẩm thời gian mỗi 50 giây
setInterval(displayWeather, 50000);

// Cập nhật thời gian thực của server
setInterval(realtimeclock, 1000);

