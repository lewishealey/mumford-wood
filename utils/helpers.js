export function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

export const sectionClasses = "text-2xl mb-1 md:mb-1.5 md:text-3xl font-heading";
export const subSectionClasses = "text-xl md:text-2xl mt-1 font-heading";

let d = new Date();
export const currentYear =  d.getFullYear();

export function formatPath(path) {
    path = path.replace("-"," ");
    path = path.replace("/product/","");
    path = path.replace("/"," / ");
    return <small className="text-xs text-gray-600 capitalize">{path}</small>
}

export function createCsvObject(data) {
    let tempArray = [];
    const headerKeys = Object.keys(data[0]);
    tempArray.push(headerKeys);
    data.forEach(dataItem => {
        let tempTempArray = [];
        headerKeys.forEach(key => {
            if(key == "date_updated") {
                tempTempArray.push(dataItem['date_updated'].toDate().toString())
            } else if(dataItem[key]) {
                tempTempArray.push(dataItem[key])
            }
        })
        tempArray.push(tempTempArray);
    });

    return tempArray.length > 0 ? tempArray : null;
}

export function fileDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }

    if(mm<10) {
        mm='0'+mm;
    }

    today = dd+'-'+mm+'-'+yyyy;

    return today;
    today = mm+'-'+dd+'-'+yyyy;
    today = mm+'/'+dd+'/'+yyyy;
    today = dd+'-'+mm+'-'+yyyy;
    today = dd+'/'+mm+'/'+yyyy;
}

export function today() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }

    if(mm<10) {
        mm='0'+mm;
    }

    today = dd+'-'+mm+'-'+yyyy;
    return today.toString;
}


export function getTags(data) {
    let tags = [];
    data && data?.metadata?.tags?.forEach(tag => {
        tags.push(tag.sys.id);
    })
    return tags;
  }

export function isSelectionInTags(itemTags, selectedTags) {
    let result = false;
    itemTags.forEach(item => {
        // console.info(item, selectedTags, selectedTags.includes(item));
        if(selectedTags.includes(item)){
            result = true;
        }
    })
    return result;
  }
