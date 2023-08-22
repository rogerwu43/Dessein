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

        this.localStorage = undefined;
        this.localStorageId = '@DesseinApp';
    }

    getDesseiners() {
        return this.desseiners;
    }

    hasInitLocalStorage() {
        return this.localStorage !== undefined;
    }

    async initLocalStorage() {
        var self = this;
        return AsyncStorage.getItem(self.localStorageId).then((_localStorage) => {
            return self.localStorage = JSON.parse(_localStorage) || {};
        });
    }

    getLocalStorage() {
        return this.localStorage;
    }

    async saveLocalStorage() {
        const newLocalStorage = !!this.localStorage ? this.localStorage : {};
        return AsyncStorage.setItem(this.localStorageId, JSON.stringify(newLocalStorage));
    }

    getDesseins(desseiner) {
        return !!this.localStorage[desseiner] ? [...this.localStorage[desseiner]] : [];
    }

    generateNextDesseinId(desseiner) {
        var currentDesseins = this.localStorage[desseiner];

        var newDesseinId = 1;
        if (currentDesseins.length) {
            const currentHighestId = currentDesseins.reduce((prev, cur) => { return prev.id > cur.id ? prev : cur }).id;
            newDesseinId = currentHighestId + 1;
        }
        return newDesseinId;
    }

    async addDessein(desseiner, desseinText) {
        const newDessein = {
            id: this.generateNextDesseinId(desseiner),
            text: desseinText,
        };
        this.localStorage[desseiner].push(newDessein);

        return this.saveLocalStorage().then(() => {
            return newDessein;
        });
    }

    async updateDessein(desseiner, desseinId, newDesseinText) {
        var dessein = this.localStorage[desseiner].find((_dessein) => { return _dessein.id === desseinId });
        if (dessein) {
            dessein.text = newDesseinText;
        }

        return this.saveLocalStorage().then(() => {
            return dessein;
        });
    }

    async deleteDessein(desseiner, desseinId) {
        this.localStorage[desseiner] = this.localStorage[desseiner].filter((_dessein) => { return _dessein.id !== desseinId });

        return this.saveLocalStorage();
    }
}


export default new DesseinerService();
