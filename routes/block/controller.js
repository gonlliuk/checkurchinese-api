class Block {
    constructor({ models }) {
        this.models = models;

        this.getBlocks = this.getBlocks.bind(this);
        this.getBlocksByPageId = this.getBlocksByPageId.bind(this);
        this.getBlockById = this.getBlockById.bind(this);
        this.createBlock = this.createBlock.bind(this);
        this.patchBlock = this.patchBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }

    getBlocks(req, res) {
        return this.models.block
            .find({})
            .populate({
                path: 'tasks',
            })
            .select('-_id -__v')
            .then(blocks => res.json(blocks))
            .catch(error => res.error(error));
    }

    getBlocksByPageId(req, res) {
        return this.models.page
            .findOne({ id: req.params.pageId })
            .populate({
                path: 'blocks',
                populate: {
                    path: 'tasks',
                },
            })
            .select('-_id -__v')
            .then(page => {
                if (!page) { return res.error(404); }

                return res.json(page.blocks);
            })
            .catch(error => res.error(error));
    }

    getBlockById(req, res) {
        return this.models.block
            .findOne({ id: req.params.blockId })
            .populate({
                path: 'tasks',
            })
            .select('-_id -__v')
            .then(block => {
                if (!block) { return res.error(404); }

                return res.json(block);
            })
            .catch(error => res.error(error));
    }

    async createBlock(req, res) {
        const { title, pageId } = req.body;

        try {
            const page = await this.models.page
                .findOne({ id: pageId })
                .populate('blocks');
            if (!page) { return res.error(404, 'Page not found'); }

            const block = await this.models.block.create({ title, pageId });
            if (!block) { res.error(500, 'Block in not created. Try again'); }

            if (page.blocks.findIndex(item => item.id === block.id) !== -1) {
                return res.json(block);
            }

            page.blocks.push(block._id);
            page.save();
            return res.json(block);
        } catch (e) {
            return res.error(e);
        }
    }

    async patchBlock(req, res) {
        const { title, pageId } = req.body;

        try {
            const newPage = await this.models.page
                .findOne({ id: pageId })
                .populate('blocks');
            if (!newPage) { return res.error(500, 'There is no new page to link'); }

            const block = await this.models.block
                .findOne({ id: req.params.blockId });
            if (!block) { return res.error(404, 'Block not found'); }

            if (block.pageId !== pageId) {
                const oldPage = await this.models.page
                    .findOne({ id: block.pageId })
                    .populate('blocks');
                if (oldPage) {
                    const oldIndex = oldPage.blocks.findIndex(item => item.id === block.id);
                    if (oldIndex !== -1) {
                        oldPage.blocks.splice(oldIndex, 1);
                        oldPage.save();
                    }
                }
            }

            if (newPage.blocks.findIndex(item => item.id === block.id) === -1) {
                newPage.blocks.push(block._id);
                newPage.save();
            }

            const updatedBlock = await this.models.block
                .findOneAndUpdate({ id: req.params.blockId }, { title, pageId }, { new: true })
                .select('-_id -__v');
            return res.status(200).json(updatedBlock);
        } catch (e) {
            return res.error(e);
        }
    }

    async deleteBlock(req, res) {
        try {
            const page = await this.models.page
                .findOne({ id: req.params.pageId })
                .populate('blocks');
            if (page) {
                const index = page.blocks.findIndex(item => item.id === req.params.blockId);
                if (index !== -1) {
                    page.blocks.splice(index, 1);
                    page.save();
                }
            }

            await this.models.block.findOneAndRemove({ id: req.params.blockId});
            return res.status(200).send(true);
        } catch (e) {
            return res.error(e);
        }
    }
}

module.exports = Block;
