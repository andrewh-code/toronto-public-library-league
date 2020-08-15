class PlayerInfoView {

    constructor(name, zuluruId){
        this.name = name;
        this.zuluruId = zuluruId;
        this.stats = [];
    };

    // setter
    set setName(name) {
        this.name = name;
    }

    set setSex(sex) {
        this.sex = sex;
    }

    set setZuluruId(zuluruId) {
        this.zuluruId = zuluruId;
    }

    set setPicture(picture) {
        this.picture = picture;
    }

    // has to be array
    set setStats(stats) {
        this.stats = stats;
    }

    pushStats(statsElement) {
        this.stats.push(statsElement);
    }

}

export default PlayerInfoView;
