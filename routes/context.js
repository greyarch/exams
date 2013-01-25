exports.exams = {
    menu: [
        {name: "exams", url: "/exams", title: "Exams", roles: ["admin", "test", "exam", "author", "user"]},
        {name: "calendar", url: "/calendar", title: "Calendar", roles: ["admin", "test", "exam", "author", "user"]},
        {name: "examtypes", url: "/examtypes", title: "Exam Types", roles: ["admin"]}
    ]
}

exports.reports = {
    menu: [
        {name: "participants", url: "/reports", title: "Participants", roles: ["admin", "test"]},
//        {name: "certificates", url: "#", title: "Certificates", roles: ["admin", "user"]},
//        {name: "financial", url: "#", title: "Financial", roles: ["admin"]}
    ]
}