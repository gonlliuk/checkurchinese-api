class Home {
    constructor({ models }) {
        this.models = models;

        this.getHome = this.getHome.bind(this);
        this.createHome = this.createHome.bind(this);
        this.patchHome = this.patchHome.bind(this);
        this.deleteHome = this.deleteHome.bind(this);
    }

    getHome(req, res) {
        return this.models.home.find({})
            .select('-_id -__v')
            .then(homes => res.json(homes[0]))
            .catch(error => res.error(error));
    }

    createHome(req, res) {
        const { title, welcome, text } = req.body;

        return this.models.home
            .create({ title, welcome, text })
            .select('-_id -__v')
            .then(home => {
                if (!home) { res.error(500); }

                return res.json(home);
            })
            .catch(error => res.error(error));
    }

    patchHome(req, res) {
        const { title } = req.body;

        return this.models.home
            .findOneAndUpdate({ id: req.params.homeId }, { title }, { new: true })
            .select('-_id -__v')
            .then(home => {
                if (!home) { return res.error(404); }

                return res.json(home);
            })
            .catch(error => res.error(error));
    }

    deleteHome(req, res) {
        return this.models.home
            .findOneAndRemove({ id: req.params.homeId })
            .then(() => res.status(200).end())
            .catch(error => res.error(error));
    }
}

module.exports = Home;
