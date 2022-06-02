function Collection () {
    //данные хранятся в формате { ID1:{key:value}, ID2:{key:value}, etc.}
    //index - номер по-порядку как в массиве
    let data = {};

    this.set = (key, value) => {
        let ID = Date.now() + Math.floor(Math.random()*150);
        data[ID] = {[key]: value};
        return this;     
    }
    this.hasID = (ID) => {
        return ID in data ? true : false;
    }
    this.hasKey = (key) => {
        for (ID in data) {
            if(key in data[ID]) return true;
            else continue;
        }
        return false;
    }
    this.hasIndex = (index) => {
        return Object.entries(data)[index] ? true : false;
    }
    this.getDataArr = () => {
        let dataArr = [];
        for (ID in data) {
            dataArr.push(data[ID])
        }
        return dataArr; // [{key:value}]
    }
    this.getDataObj = () => {
        return data; // {ID:{key:value}}
    }
    this.size = () => {
        return Object.entries(data).length;
    }
    this.getByID = (ID) => {
        return data[ID] ? data[ID] : false;
    }
    this.hasIndex = (index) => {
        return Object.entries(data)[index] ? true : false;
    }
    this.getByIndex = (index) => {
        return Object.entries(data)[index];
    }
    this.removeById = (ID) => {
        delete data[ID];
    }
    this.removeByKeyAll = (key) => {
        //если несколько одинаковых ключей удаляет все
        for (ID in data){
           key in data[ID] ? delete data[ID] : ''
        }
        return this;
    }

    this.union = (...args) => {
        args.forEach((dataObj) => 
            data = {...data, ...dataObj.getDataObj()}
        );
        return this;
    }

    this.forEach = (callback)  => {
        Object.entries(data).forEach((arr, index) => {
            let key = Object.entries(arr[1])[0][0];
            let value = Object.entries(arr[1])[0][1];
            return callback (key, value, index);
        });
    }

    this.unique = () => {
        let dataRes = [];
        for (ID in data) {
            dataRes.push(data[ID]);
        }
        dataRes.forEach((elem, index) => {
            if (dataRes.filter(el => JSON.stringify(el) === JSON.stringify(elem)).length > 1)
                dataRes.splice(index, 1);
        })
        return dataRes;
    }
    this.uniqueKeys = () => {
        let dataRes = [];
        for (ID in data) {
            dataRes.push(...Object.keys(data[ID]));
        }
        dataRes.forEach((elem, index) => {
            if (dataRes.filter(el => el === elem).length > 1)
                dataRes.splice(index, 1);
        })
        return dataRes;
    }

    this.sort = (callback) => {
        let dataArr = [];
        for (ID in data) {
            dataArr.push(data[ID])
        };
        dataArr.sort(
            (obj1, obj2) =>
            {
                let key1 = Object.entries(obj2)[0][0];
                let key2 = Object.entries(obj1)[0][0];
                let value1 = Object.entries(obj2)[0][1];
                let value2 = Object.entries(obj1)[0][1];
                return callback(value1, value2, key1, key2);
            }
        );
        return dataArr;
    }

    this.sortID = (callback) => {
        let dataArr = Object.entries(data);
        console.log(dataArr);
        dataArr.sort((obj1, obj2) => {
            let ID1 = obj1[0];
            let ID2 = obj2[0];
            return callback(ID1, ID2);
        });
        return dataArr;
    }
    this.editByID = (ID, value) => {
        let key = Object.keys(data[ID])[0];
        data[ID][key] = value;

    return this;
    }
}