class Page {
    constructor({ models }) {
        this.models = models;

        this.getPages = this.getPages.bind(this);
        this.getPageById = this.getPageById.bind(this);
        this.createPage = this.createPage.bind(this);
        this.patchPage = this.patchPage.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }

    getPages(req, res) {
        return this.models.page.find({})
            .select('-_id -__v')
            .then(pages => res.json(pages))
            .catch(error => res.error(error));
    }

    getPageById(req, res) {
        return this.models.page
            .findOne({ id: req.params.pageId })
            .select('-_id -__v')
            .then(page => {
                if (!page) { return res.error(404); }

                return res.json(page);
            })
            .catch(error => res.error(error));
    }

    createPage(req, res) {
        const { title } = req.body;

        return this.models.page
            .create({ title })
            .then(page => {
                if (!page) { res.error(500); }

                return res.json({
                    id: page.id,
                    title: page.title,
                });
            })
            .catch(error => res.error(error));
    }

    patchPage(req, res) {
        const { title } = req.body;

        return this.models.page
            .findOneAndUpdate({ id: req.params.pageId }, { title }, { new: true })
            .select('-_id -__v')
            .then(page => {
                if (!page) { return res.error(404); }

                return res.json(page);
            })
            .catch(error => res.error(error));
    }

    deletePage(req, res) {
        return this.models.page
            .findOneAndRemove({ id: req.params.pageId })
            .then(() => res.status(200).end())
            .catch(error => res.error(error));
    }
}

module.exports = Page;
