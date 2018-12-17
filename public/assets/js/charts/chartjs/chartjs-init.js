var gridbordercolor = "#eee";

var InitiateChartJS = function () {
    return {
        init: function () {


            var lineChartData = {
                labels: ["", "", "", "", "", "", ""],
                datasets: [
                    {
                        fillColor: "rgba(93, 178, 255,.4)",
                        strokeColor: "rgba(93, 178, 255,.7)",
                        pointColor: "rgba(93, 178, 255,.7)",
                        pointStrokeColor: "#fff",
                        data: [100, 90, 85, 81, 70, 68, 65]
                    },
                    {
                        fillColor: "rgba(215, 61, 50,.4)",
                        strokeColor: "rgba(215, 61, 50,.6)",
                        pointColor: "rgba(215, 61, 50,.6)",
                        pointStrokeColor: "#fff",
                        data: [90, 85, 80, 70, 66, 66, 60]
                    }
                ]

            };

            var barChartData = {
                labels: ["1min", "2min", "3min", "4min", "5min", "6min", "7min"],
                datasets: [
                    {
                        fillColor: themeprimary,
                        strokeColor: themeprimary,
                        data: [100, 90, 85, 81, 70, 68, 65]
                    },
                    {
                        fillColor: themethirdcolor,
                        strokeColor: themethirdcolor,
                        data: [90, 85, 80, 70, 66, 66, 60]
                    }
                ]

            };


            new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
            new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);

        }
    };
}();
