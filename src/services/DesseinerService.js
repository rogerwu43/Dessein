import AsyncStorage from '@react-native-async-storage/async-storage';


class DesseinerService {
    constructor() {
        this.desseiners = {
            gaia: {
                order: 1,
                avatar: require('../assets/dessein-gaia.png'),
                color: '#ff9e00',
            },
            xela: {
                order: 2,
                avatar: require('../assets/dessein-xela.png'),
                color: '#ff1f00',
            },
            aurora: {
                order: 3,
                avatar: require('../assets/dessein-aurora.png'),
                color: '#ffe400',
            },
            xuan: {
                order: 4,
                avatar: require('../assets/dessein-xuan.png'),
                color: '#5f001d',
            },
            eta: {
                order: 5,
                avatar: require('../assets/dessein-eta.png'),
                color: '#000000',
            },
        };

        this._localStorage = undefined;
        this.localStorageId = '@DesseinApp';
    }

    getDesseiners() {
        return this.desseiners;
    }

    async getLocalStorage() {
        if (this._localStorage) {
            // console.log('stored', this._localStorage);
            return Promise.resolve(this._localStorage);
        }

        var self = this;
        return AsyncStorage.getItem(this.localStorageId).then((localStorage) => {
            // console.log(JSON.parse(localStorage) || {});
            return self._localStorage = JSON.parse(localStorage) || {};
        });
    }

    async getDesseins(desseiner) {
        var self = this;
        return this.getLocalStorage().then((localStorage) => {
            if (!localStorage[desseiner]) { return []; }
            return [...localStorage[desseiner]];
        });
    }

    async setLocalStorage(newLocalStorage) {
        newLocalStorage = newLocalStorage || {};

        var self = this;
        return AsyncStorage.setItem(this.localStorageId, JSON.stringify(newLocalStorage)).then(() => {
            self._localStorage = newLocalStorage;
        });
    }

    async addDessein(desseinText, desseiner) {
        var self = this;
        return this.getLocalStorage().then((localStorage) => {
            var desseinerDesseins = localStorage[desseiner] || [];
            
            var newDesseinId = 1;
            if (desseinerDesseins.length) {
                const currentHighestId = desseinerDesseins.reduce((prev, cur) => { return prev.id > cur.id ? prev : cur }).id;
                newDesseinId = currentHighestId + 1;
            }
            const newDessein = {
                id: newDesseinId,
                text: desseinText,
            };

            desseinerDesseins.push(newDessein);
            localStorage[desseiner] = desseinerDesseins;
            return self.setLocalStorage(localStorage).then(() => {
                return newDessein;
            });
        });
    }

    async editDessein(desseiner, desseinId, newDesseinText) {
        var self = this;
        return this.getLocalStorage().then((localStorage) => {
            var desseinerDesseins = localStorage[desseiner] || [];
            
            var dessein = desseinerDesseins.find((_dessein) => { return _dessein.id === desseinId });
            if (dessein) {
                dessein.text = newDesseinText;
            }

            localStorage[desseiner] = desseinerDesseins;
            return self.setLocalStorage(localStorage).then(() => {
                return dessein;
            });
        });  
    }

    async deleteDessein(desseiner, desseinId) {
        if (!desseinId) {
            return Promise.resolve();
        }

        var self = this;
        return this.getLocalStorage().then((localStorage) => {
            var desseinerDesseins = localStorage[desseiner] || [];
            desseinerDesseins = desseinerDesseins.filter((_dessein) => { return _dessein.id !== desseinId });

            localStorage[desseiner] = desseinerDesseins;
            return self.setLocalStorage(localStorage);
        });   
    }

    async clear() {
        return this.setLocalStorage({});
    }
}


export default new DesseinerService();
