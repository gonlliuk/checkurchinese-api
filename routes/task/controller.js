class Task {
    constructor({ models }) {
        this.models = models;

        this.getTasks = this.getTasks.bind(this);
        this.getTasksByBlockId = this.getTasksByBlockId.bind(this);
        this.getTaskById = this.getTaskById.bind(this);
        this.createTask = this.createTask.bind(this);
        this.patchTask = this.patchTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    getTasks(req, res) {
        return this.models.task.find({})
            .select('-_id -__v')
            .then(tasks => res.json(tasks))
            .catch(error => res.error(error));
    }

    getTasksByBlockId(req, res) {
        return this.models.block
            .findOne({ id: req.params.blockId })
            .populate('tasks')
            .select('-_id -__v')
            .then(block => {
                if (!block) { return res.error(404); }

                return res.json(block.tasks);
            })
            .catch(error => res.error(error));
    }

    getTaskById(req, res) {
        return this.models.task
            .findOne({ id: req.params.taskId })
            .select('-_id -__v')
            .then(task => {
                if (!task) { return res.error(404); }

                return res.json(task);
            })
            .catch(error => res.error(error));
    }

    async createTask(req, res) {
        const { title, blockId, text, additionalQuestion, comment, questions } = req.body;

        try {
            const block = await this.models.block
                .findOne({ id: blockId })
                .populate('tasks');
            if (!block) { return res.error(404, 'Block not found'); }

            const task = await this.models.task.create({ title, blockId, text, additionalQuestion, comment, questions });
            if (!task) { res.error(500, 'Task in not created. Try again'); }

            if (block.tasks.findIndex(item => item.id === task.id) !== -1) {
                return res.json(task);
            }

            block.tasks.push(task._id);
            block.save();
            return res.json(task);
        } catch (e) {
            return res.error(e);
        }
    }

    async patchTask(req, res) {
        const { title, blockId, text, additionalQuestion, comment, questions } = req.body;

        try {
            const newBlock = await this.models.block
                .findOne({ id: blockId })
                .populate('tasks');
            if (!newBlock) { return res.error(500, 'There is no new block to link'); }

            const task = await this.models.task
                .findOne({ id: req.params.taskId });
            if (!task) { return res.error(404, 'Task not found'); }

            if (task.blockId !== blockId) {
                const oldBlock = await this.models.block
                    .findOne({ id: task.blockId })
                    .populate('tasks');
                if (oldBlock) {
                    const oldIndex = oldBlock.tasks.findIndex(item => item.id === task.id);
                    if (oldIndex !== -1) {
                        oldBlock.tasks.splice(oldIndex, 1);
                        oldBlock.save();
                    }
                }
            }

            if (newBlock.tasks.findIndex(item => item.id === task.id) === -1) {
                newBlock.tasks.push(task._id);
                newBlock.save();
            }

            const updatedTask = await this.models.task
                .findOneAndUpdate({ id: req.params.taskId }, { title, blockId, text, additionalQuestion, comment, questions }, { new: true })
                .select('-_id -__v');
            return res.status(200).json(updatedTask);
        } catch (e) {
            return res.error(e);
        }
    }

    async deleteTask(req, res) {
        try {
            const block = await this.models.block
                .findOne({ id: req.params.blockId })
                .populate('tasks');
            if (block) {
                const index = block.tasks.findIndex(item => item.id === req.params.taskId);
                if (index !== -1) {
                    block.tasks.splice(index, 1);
                    block.save();
                }
            }

            await this.models.task.findOneAndRemove({ id: req.params.taskId});
            return res.status(200).send(true);
        } catch (e) {
            return res.error(e);
        }
    }
}

module.exports = Task;
