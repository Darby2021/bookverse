$(document).ready(function () {
    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#FF7900";
    Chart.defaults.elements.bar.borderWidth = 1;

    const DashboardController = {
        contribution_faculties_chart: null,
        contribution_year_chart: null,
        SetUpChart() {
            const ctx_article = $("#contribution_faculties_chart").get(0).getContext("2d");
            DashboardController.contribution_faculties_chart = new Chart(ctx_article, {
                type: "bar",
                data: {},
                options: {
                    responsive: true
                }
            });

            const ctx_contribution = $("#contribution_year_chart").get(0).getContext("2d");
            DashboardController.contribution_year_chart = new Chart(ctx_contribution, {
                type: "line",
                data: {},
                options: {
                    responsive: true
                }
            });

        },
        EventListener() {
            $('#input_faculty').change(function (){
                const faculty_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalContributeYears(faculty_id)
                    .then((response) => {
                        setTimeout(()=>{
                            const {statistical_Contribute_year_data} = response
                            DashboardController.RenderContributeYearChart(statistical_Contribute_year_data)
                            Loading(false)
                        }, 1500)
                    })
            })

            $('#input_magazine').change(function (){
                const magazine_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalContributionFaculties(magazine_id)
                    .then((response) => {
                        setTimeout(()=>{
                            const {statistical_contribute_faculty_data} = response
                            DashboardController.RenderContributeFacultyChart(statistical_contribute_faculty_data)
                            Loading(false)
                        }, 1500)
                    })
            })
        },
        RenderContributeFacultyChart(statistical) {
            let contribute_faculty_labels = []
            let contribute_faculty_data = []
            statistical.map( data => {
                contribute_faculty_labels.push(data.faculty_name)
                contribute_faculty_data.push(data.article_quantity)
            })
            const data_chart = {
                labels: contribute_faculty_labels,
                datasets: [{
                    label: "Contribution",
                    data: contribute_faculty_data,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgb(153, 102, 255)"
                }]
            }
            DashboardController.contribution_faculties_chart.data = data_chart
            DashboardController.contribution_faculties_chart.update()
        },
        RenderContributeYearChart(statistical) {
            let contribute_years_labels = []
            let contribute_years_data = []
            statistical.map( data => {
                contribute_years_labels.push(data.academic_year)
                contribute_years_data.push(data.article_quantity)
            })
            const data_chart = {
                labels: contribute_years_labels,
                datasets: [{
                    label: "Contribution",
                    data: contribute_years_data,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: 'rgba(54, 162, 235, 0.5)',
                    tension: .1
                }]
            }
            DashboardController.contribution_year_chart.data = data_chart
            DashboardController.contribution_year_chart.update()
        },
        GetStatisticalContributionFaculties(magazine_id){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-contribution-faculties/${magazine_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
        },
        GetStatisticalContributeYears(faculty_id){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-contribution-years/${faculty_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
        },
        GetFirstStatistical() {
            Loading(true)
            const contribute_of_faculty = DashboardController.GetStatisticalContributionFaculties('all')
            const contribute_of_years = DashboardController.GetStatisticalContributeYears('all')
            Promise.all([contribute_of_faculty, contribute_of_years])
                .then((results) => {
                    setTimeout(()=>{
                        const {statistical_contribute_faculty_data} = results[0]
                        DashboardController.RenderContributeFacultyChart(statistical_contribute_faculty_data)

                        const {statistical_Contribute_year_data} = results[1]
                        DashboardController.RenderContributeYearChart(statistical_Contribute_year_data)
                        Loading(false)
                    }, 1500)

                })
                .catch((error) => {
                    console.log(error)
                    Alert.Show('danger', 'something went wrong')
                    Loading(false)
                });
        },
        Run() {
            DashboardController.SetUpChart()
            DashboardController.EventListener()
            DashboardController.GetFirstStatistical()
        }
    }

    DashboardController.Run()


    // $.ajax({
    //     url: '/admin/dashboard/chart',
    //     type: 'get',
    //     beforeSend: LoadingWrapper(true),
    //     success: function (response) {
    //         setTimeout(() => {
    //             if (response.code === 200) {
    //                 console.log(response)
    //                 let best_sale_products_labels = []
    //                 let best_sale_products_data = []
    //                 response.best_sale_products.map((product) => {
    //                     best_sale_products_labels.push(product.name)
    //                     best_sale_products_data.push(product.quantity)
    //                 })
    //                 best_sale_product_chart.data = {
    //                     labels: best_sale_products_labels,
    //                     datasets: [{
    //                         label: 'Quantity',
    //                         backgroundColor: [
    //                             "rgba(235, 22, 22, .7)",
    //                             "rgba(235, 22, 22, .6)",
    //                             "rgba(235, 22, 22, .5)",
    //                             "rgba(235, 22, 22, .4)",
    //                             "rgba(235, 22, 22, .3)"
    //                         ],
    //                         data: best_sale_products_data
    //                     }]
    //                 }
    //
    //                 let traffic_web_labels = []
    //                 let traffic_web_data = []
    //                 response.traffic_web_report.map(traffic => {
    //                     traffic_web_labels.push(traffic.hour_access + 'h')
    //                     traffic_web_data.push(traffic.quantity_access)
    //                 })
    //
    //                 traffic_web_chart.data = {
    //                     labels: traffic_web_labels,
    //                     datasets: [{
    //                         label: "Customer Access Website",
    //                         data: traffic_web_data,
    //                         backgroundColor: "rgba(235, 22, 22, .7)",
    //                         fill: true
    //                     }]
    //                 }
    //
    //                 best_sale_product_chart.update()
    //                 traffic_web_chart.update()
    //             }
    //             LoadingWrapper(false)
    //         }, 1000)
    //     },
    //     error: function () {
    //         LoadingWrapper(false)
    //     }
    // })
})