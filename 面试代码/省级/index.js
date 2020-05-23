const areas = require('./areas.json');
const cities = require('./cities.json');
const provinces = require('./provinces.json');
const fs = require('fs');
var options = [];
provinces.forEach((ele) => {
    var temp = {
        "lable": ele.name,
        "value": ele.code,
        "children": []
    }
    cities.forEach((element) => {
        if (ele.code == element.provinceCode) {
            temp.children.push({
                "lable": element.name,
                "value": element.code,
                'children': []
            })
        }
    })
    options.push(temp);
});
options.forEach((ele1, index1) => {
    ele1.children.forEach((ele2, index2) => {
        areas.forEach((ele3) => {
            if (ele3.cityCode === ele2.value) {
                options[index1].children[index2].children.push({
                    "lable": ele3.name,
                    "value": ele3.code,
                })
            }
        })
    })
})
fs.writeFile('.1.json', JSON.stringify(options), (err, doc) => {
    console.log(doc);
})